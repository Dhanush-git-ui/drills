import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import matplotlib.pyplot as plt
import os
import re

def build_all_logos():
    os.makedirs('public/images', exist_ok=True)
    
    # 1. Load original screenshot
    src = Image.open('public/Screenshot 2026-09-04 091617.png').convert('RGB')
    arr = np.array(src)

    # 2. Extract Handshake Region (y: 6 to 88, x: 50 to 262)
    hs_crop = arr[6:88, 50:262]
    r_hs = hs_crop[:, :, 0].astype(float)
    ink_hs = np.clip((245 - r_hs) / (245 - 40), 0.0, 1.0)
    ink_hs = np.where(ink_hs < 0.12, 0.0, ink_hs)
    ink_hs = np.clip((ink_hs - 0.12) / (0.88 - 0.12), 0.0, 1.0)

    # 4x upsampled smoothed mask for handshake contour vector extraction
    hs_im_4x = Image.fromarray((ink_hs * 255).astype(np.uint8)).resize(
        (hs_crop.shape[1] * 4, hs_crop.shape[0] * 4), Image.Resampling.LANCZOS
    )
    hs_im_smooth = hs_im_4x.filter(ImageFilter.GaussianBlur(radius=1.5))
    hs_arr_smooth = np.array(hs_im_smooth).astype(float) / 255.0

    # Trim transparent borders
    y_idx, x_idx = np.where(hs_arr_smooth > 0.15)
    pad = 12
    y0 = max(0, y_idx.min() - pad)
    y1 = min(hs_arr_smooth.shape[0], y_idx.max() + pad + 1)
    x0 = max(0, x_idx.min() - pad)
    x1 = min(hs_arr_smooth.shape[1], x_idx.max() + pad + 1)

    hs_trimmed = hs_arr_smooth[y0:y1, x0:x1]
    hs_w, hs_h = hs_trimmed.shape[1], hs_trimmed.shape[0]

    # Extract Vector Contour
    fig, ax = plt.subplots()
    cs = ax.contour(hs_trimmed, levels=[0.42])
    plt.close(fig)

    segments = cs.allsegs[0] if hasattr(cs, 'allsegs') else [p.vertices for c in cs.collections for p in c.get_paths()]
    hs_paths = []
    for v in segments:
        if len(v) < 6:
            continue
        d = f"M {v[0, 0]:.1f},{v[0, 1]:.1f}"
        for pt in v[1:]:
            d += f" L {pt[0]:.1f},{pt[1]:.1f}"
        d += " Z"
        hs_paths.append(d)

    hs_path_d = " ".join(hs_paths)

    # Colors
    RED_HEX = "#C8102E"
    RED_RGB = (200, 16, 46)
    WHITE_HEX = "#FFFFFF"
    WHITE_RGB = (255, 255, 255)

    # 3. Save Handshake SVG (standalone vector icon)
    svg_hs_red = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {hs_w} {hs_h}" width="100%" height="100%">
  <path d="{hs_path_d}" fill="{RED_HEX}" fill-rule="evenodd" />
</svg>'''
    with open('public/images/logo-handshake.svg', 'w') as f:
        f.write(svg_hs_red)

    svg_hs_white = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {hs_w} {hs_h}" width="100%" height="100%">
  <path d="{hs_path_d}" fill="{WHITE_HEX}" fill-rule="evenodd" />
</svg>'''
    with open('public/images/logo-handshake-white.svg', 'w') as f:
        f.write(svg_hs_white)

    # 4. Save PNG Handshake icons (High-res 4x)
    def make_png(alpha_arr, color_rgb):
        out = np.zeros((alpha_arr.shape[0], alpha_arr.shape[1], 4), dtype=np.uint8)
        out[:, :, 0] = color_rgb[0]
        out[:, :, 1] = color_rgb[1]
        out[:, :, 2] = color_rgb[2]
        out[:, :, 3] = np.clip(alpha_arr * 255, 0, 255).astype(np.uint8)
        return Image.fromarray(out)

    hs_png_red = make_png(hs_trimmed, RED_RGB)
    hs_png_red.save('public/images/logo-handshake-red.png')

    hs_png_white = make_png(hs_trimmed, WHITE_RGB)
    hs_png_white.save('public/images/logo-handshake-white.png')

    # 5. Render Georgia Bold text on high-res canvas
    # Using Georgia Bold font from Windows system
    font_path = "C:/Windows/Fonts/georgiab.ttf"
    if not os.path.exists(font_path):
        font_path = "C:/Windows/Fonts/georgia.ttf"
    
    font_size = 80
    font = ImageFont.truetype(font_path, font_size)

    # Text rendering for Stacked and Horizontal
    # Let's measure text bounding box
    dummy_im = Image.new('RGBA', (1200, 200), (0, 0, 0, 0))
    dummy_draw = ImageDraw.Draw(dummy_im)
    bbox = dummy_draw.textbbox((0, 0), "PSRS Rock Drills", font=font)
    t_w = bbox[2] - bbox[0]
    t_h = bbox[3] - bbox[1]

    # Create High-Res Stacked Logo
    # Dimensions:
    st_pad_x = 40
    st_pad_y = 30
    st_gap = 24
    st_canvas_w = max(hs_w, t_w) + st_pad_x * 2
    st_canvas_h = hs_h + st_gap + t_h + st_pad_y * 2

    # Stacked Red PNG
    st_red = Image.new('RGBA', (st_canvas_w, st_canvas_h), (0, 0, 0, 0))
    st_red.paste(hs_png_red, ((st_canvas_w - hs_w) // 2, st_pad_y), hs_png_red)
    draw_st_red = ImageDraw.Draw(st_red)
    txt_x = (st_canvas_w - t_w) // 2 - bbox[0]
    txt_y = st_pad_y + hs_h + st_gap - bbox[1]
    draw_st_red.text((txt_x, txt_y), "PSRS Rock Drills", font=font, fill=RED_RGB)
    st_red.save('public/images/logo-stacked-red.png')
    st_red.save('public/images/logo.png')

    # Stacked White PNG
    st_white = Image.new('RGBA', (st_canvas_w, st_canvas_h), (0, 0, 0, 0))
    st_white.paste(hs_png_white, ((st_canvas_w - hs_w) // 2, st_pad_y), hs_png_white)
    draw_st_white = ImageDraw.Draw(st_white)
    draw_st_white.text((txt_x, txt_y), "PSRS Rock Drills", font=font, fill=WHITE_RGB)
    st_white.save('public/images/logo-stacked-white.png')

    # Create High-Res Horizontal Logo
    h_pad_x = 36
    h_pad_y = 24
    h_gap = 48
    # In horizontal, scale handshake slightly to match text height harmoniously
    hs_scale_h = 0.52
    hs_h_w = int(hs_w * hs_scale_h)
    hs_h_h = int(hs_h * hs_scale_h)
    hs_png_red_h = hs_png_red.resize((hs_h_w, hs_h_h), Image.Resampling.LANCZOS)
    hs_png_white_h = hs_png_white.resize((hs_h_w, hs_h_h), Image.Resampling.LANCZOS)

    h_total_w = hs_h_w + h_gap + t_w + h_pad_x * 2
    h_total_h = max(hs_h_h, t_h) + h_pad_y * 2

    # Horizontal Red PNG
    h_red = Image.new('RGBA', (h_total_w, h_total_h), (0, 0, 0, 0))
    hs_y_offset = (h_total_h - hs_h_h) // 2
    h_red.paste(hs_png_red_h, (h_pad_x, hs_y_offset), hs_png_red_h)
    draw_h_red = ImageDraw.Draw(h_red)
    h_txt_x = h_pad_x + hs_h_w + h_gap - bbox[0]
    h_txt_y = (h_total_h - t_h) // 2 - bbox[1]
    draw_h_red.text((h_txt_x, h_txt_y), "PSRS Rock Drills", font=font, fill=RED_RGB)
    h_red.save('public/images/logo-horizontal-red.png')
    h_red.save('public/images/logo-red.png')

    # Horizontal White PNG
    h_white = Image.new('RGBA', (h_total_w, h_total_h), (0, 0, 0, 0))
    h_white.paste(hs_png_white_h, (h_pad_x, hs_y_offset), hs_png_white_h)
    draw_h_white = ImageDraw.Draw(h_white)
    draw_h_white.text((h_txt_x, h_txt_y), "PSRS Rock Drills", font=font, fill=WHITE_RGB)
    h_white.save('public/images/logo-horizontal-white.png')
    h_white.save('public/images/logo-white.png')

    # 6. Generate Pure Vector SVG for Stacked & Horizontal Logos
    # Stacked SVG
    svg_st_w = 400
    svg_st_h = 240
    svg_hs_scale = (svg_st_w * 0.72) / hs_w
    svg_hs_w = hs_w * svg_hs_scale
    svg_hs_h = hs_h * svg_hs_scale
    svg_hs_x = (svg_st_w - svg_hs_w) / 2
    svg_hs_y = 15

    svg_stacked_red = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_st_w} {svg_st_h}" width="100%" height="100%">
  <defs>
    <style>
      .logo-text-red {{
        font-family: Georgia, 'Times New Roman', 'DejaVu Serif', serif;
        font-weight: 700;
        font-size: 38px;
        fill: {RED_HEX};
        letter-spacing: -0.5px;
      }}
    </style>
  </defs>
  <g transform="translate({svg_hs_x:.2f}, {svg_hs_y:.2f}) scale({svg_hs_scale:.4f})">
    <path d="{hs_path_d}" fill="{RED_HEX}" fill-rule="evenodd" />
  </g>
  <text x="{svg_st_w / 2:.2f}" y="{svg_hs_y + svg_hs_h + 46:.2f}" text-anchor="middle" class="logo-text-red">PSRS Rock Drills</text>
</svg>'''
    with open('public/images/logo-stacked.svg', 'w') as f:
        f.write(svg_stacked_red)

    # Horizontal SVG
    svg_h_w = 580
    svg_h_h = 130
    svg_h_hs_scale = (svg_h_h * 0.76) / hs_h
    svg_h_hs_w = hs_w * svg_h_hs_scale
    svg_h_hs_h = hs_h * svg_h_hs_scale
    svg_h_hs_x = 15
    svg_h_hs_y = (svg_h_h - svg_h_hs_h) / 2

    svg_horizontal_red = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_h_w} {svg_h_h}" width="100%" height="100%">
  <defs>
    <style>
      .logo-text-h {{
        font-family: Georgia, 'Times New Roman', 'DejaVu Serif', serif;
        font-weight: 700;
        font-size: 46px;
        fill: {RED_HEX};
        letter-spacing: -0.5px;
      }}
    </style>
  </defs>
  <g transform="translate({svg_h_hs_x:.2f}, {svg_h_hs_y:.2f}) scale({svg_h_hs_scale:.4f})">
    <path d="{hs_path_d}" fill="{RED_HEX}" fill-rule="evenodd" />
  </g>
  <text x="{svg_h_hs_x + svg_h_hs_w + 24:.2f}" y="{svg_h_h / 2 + 15:.2f}" class="logo-text-h">PSRS Rock Drills</text>
</svg>'''
    with open('public/images/logo.svg', 'w') as f:
        f.write(svg_horizontal_red)
    with open('public/images/logo-horizontal.svg', 'w') as f:
        f.write(svg_horizontal_red)

    print("All logos and vector SVGs built successfully!")

if __name__ == '__main__':
    build_all_logos()
