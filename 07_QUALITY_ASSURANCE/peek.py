
with open(r'D:\Công Vi?c MMO\OPC JayT\JayT-D? Án Giá Tr? C?ng Ð?ng\03_SOURCE_OF_TRUTH\jayt_apex_interface.js', 'r', encoding='utf-8') as f:
    text = f.readlines()
for i in range(min(50, len(text))):
    print(text[i].rstrip())

