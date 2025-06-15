from PIL import Image, ImageDraw, ImageFont
import os

def create_icon():
    # Criar diretório media se não existir
    if not os.path.exists('media'):
        os.makedirs('media')
        
    # Criar imagem
    size = (256, 256)
    image = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    
    # Desenhar círculo de fundo
    draw.ellipse([(0, 0), size], fill='#2196F3')
    
    # Desenhar texto
    try:
        font = ImageFont.truetype("arial.ttf", 120)
    except:
        font = ImageFont.load_default()
        
    text = "AI"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Salvar como ICO
    image.save('media/icon.ico', format='ICO', sizes=[(256, 256)])
    print("Ícone criado com sucesso: media/icon.ico")

if __name__ == "__main__":
    create_icon() 