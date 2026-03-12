#!/usr/bin/env python3
"""
验证找到的密码是否正确
"""

import base64

# 正确密码的base64
CORRECT_PASSWORD_B64 = "SXpVRlF4TTFVelJtdFNSazB3VTJ4U1UwNXFSWGRVVlZrOWNWYzU="

# JavaScript验证逻辑的Python实现
def validate_password(input_password):
    """模拟JavaScript中的validatePassword函数"""
    try:
        # 步骤1: 对输入进行base64编码
        encoded = base64.b64encode(input_password.encode('utf-8')).decode('utf-8')
        
        # 步骤2: 在编码后添加 'xH7jK' 并进行base64编码，然后移除前3个字符
        encoded = base64.b64encode((encoded + 'xH7jK').encode('utf-8')).decode('utf-8')[3:]
        
        # 步骤3: 反转字符串并进行base64编码
        encoded = base64.b64encode(encoded[::-1].encode('utf-8')).decode('utf-8')
        
        # 步骤4: 在字符串前后分别添加 'aB3' 和 'qW9'，进行base64编码，然后移除前2个字符
        encoded = base64.b64encode(('aB3' + encoded + 'qW9').encode('utf-8')).decode('utf-8')[2:]
        
        # 步骤5: 对整个结果再进行一次base64编码
        final = base64.b64encode(encoded.encode('utf-8')).decode('utf-8')
        
        return final == CORRECT_PASSWORD_B64
    except Exception as e:
        print(f"验证错误: {e}")
        return False

# 测试找到的密码
found_password = "Ё7316"

print("验证找到的密码...")
print(f"密码: {found_password}")
print(f"密码长度: {len(found_password)}")

# 检查每个字符
print("\n密码字符分析:")
for i, char in enumerate(found_password):
    print(f"  位置 {i}: '{char}' (Unicode: U+{ord(char):04X})")

# 验证密码
is_valid = validate_password(found_password)
print(f"\n密码验证结果: {'成功' if is_valid else '失败'}")

if is_valid:
    print(f"\n恭喜！找到的正确密码是: {found_password}")
    print("\n可以在登录页面输入:")
    print(f"  用户名: admin")
    print(f"  密码: {found_password}")
else:
    print("密码验证失败，需要继续寻找")