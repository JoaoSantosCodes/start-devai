from PIL import Image, ImageDraw, ImageFont
import os

def create_devai_icon():
    # Configurações
    size = (256, 256)
    background_color = (41, 45, 62)  # Cor de fundo escura
    accent_color = (0, 122, 255)     # Cor de destaque azul
    text_color = (255, 255, 255)     # Cor do texto branco
    
    # Criar imagem
    img = Image.new('RGBA', size, background_color)
    draw = ImageDraw.Draw(img)
    
    # Desenhar círculo de fundo
    circle_radius = 100
    circle_center = (size[0]//2, size[1]//2)
    draw.ellipse(
        [
            circle_center[0] - circle_radius,
            circle_center[1] - circle_radius,
            circle_center[0] + circle_radius,
            circle_center[1] + circle_radius
        ],
        fill=accent_color
    )
    
    # Adicionar texto "AI"
    try:
        font = ImageFont.truetype("arial.ttf", 120)
    except:
        font = ImageFont.load_default()
    
    text = "AI"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    text_position = (
        (size[0] - text_width) // 2,
        (size[1] - text_height) // 2
    )
    
    draw.text(text_position, text, font=font, fill=text_color)
    
    # Salvar ícones em diferentes formatos
    output_dir = os.path.join("media", "icons")
    os.makedirs(output_dir, exist_ok=True)
    
    # Salvar PNG
    img.save(os.path.join(output_dir, "devai.png"))
    
    # Salvar ICO
    img.save(os.path.join(output_dir, "devai.ico"), format='ICO')
    
    print("Ícones criados com sucesso em:", output_dir)

if __name__ == "__main__":
    create_devai_icon() 