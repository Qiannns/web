#!/usr/bin/env python3
"""
CTFshow密码爆破脚本
目标: https://3262e255-f160-4499-9d33-0ca2c8ee49ba.challenge.ctf.show/
验证逻辑在客户端JavaScript中
"""

import base64
import itertools
import string

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
    except:
        return False

# 尝试逆向计算密码
def reverse_password():
    """尝试逆向计算密码"""
    print("=== 尝试逆向计算密码 ===")
    
    # 步骤1: 解码正确密码
    try:
        step5 = base64.b64decode(CORRECT_PASSWORD_B64).decode('utf-8')
        print(f"步骤5结果: {step5}")
        print(f"步骤5长度: {len(step5)}")
    except:
        print("无法解码正确密码")
        return None
    
    # 步骤4: btoa('aB3' + X + 'qW9').substr(2) = step5
    # 所以: btoa('aB3' + X + 'qW9') = '??' + step5
    # 我们需要找到正确的2字符前缀
    
    print("\n尝试所有可能的2字符前缀...")
    # Base64字符集
    b64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    
    for i in range(len(b64_chars)):
        for j in range(len(b64_chars)):
            prefix = b64_chars[i] + b64_chars[j]
            step4_full = prefix + step5
            
            try:
                step4_decoded = base64.b64decode(step4_full).decode('utf-8')
                
                # 检查是否符合 'aB3' + X + 'qW9' 格式
                if step4_decoded.startswith('aB3') and step4_decoded.endswith('qW9'):
                    step3 = step4_decoded[3:-3]
                    print(f"\n找到有效前缀: {prefix}")
                    print(f"步骤3结果: {step3}")
                    
                    # 步骤3: btoa(encoded.split('').reverse().join(''))
                    step2_reversed = base64.b64decode(step3).decode('utf-8')
                    step2 = step2_reversed[::-1]
                    print(f"步骤2结果: {step2}")
                    
                    # 步骤2: btoa(encoded + 'xH7jK').slice(3) = step2
                    # 所以: btoa(encoded + 'xH7jK') = '???' + step2
                    # 需要找到正确的3字符前缀
                    
                    print("尝试所有可能的3字符前缀...")
                    for k in range(len(b64_chars)):
                        for l in range(len(b64_chars)):
                            for m in range(len(b64_chars)):
                                prefix2 = b64_chars[k] + b64_chars[l] + b64_chars[m]
                                step1_full = prefix2 + step2
                                
                                try:
                                    step1_decoded = base64.b64decode(step1_full).decode('utf-8')
                                    
                                    if step1_decoded.endswith('xH7jK'):
                                        original_base64 = step1_decoded[:-5]
                                        print(f"找到第二前缀: {prefix2}")
                                        print(f"原始base64: {original_base64}")
                                        
                                        try:
                                            password = base64.b64decode(original_base64).decode('utf-8')
                                            print(f"通过逆向找到密码: {password}")
                                            
                                            # 验证密码
                                            if validate_password(password):
                                                print(f"密码验证成功: {password}")
                                                return password
                                            else:
                                                print(f"密码验证失败: {password}")
                                        except:
                                            continue
                                except:
                                    continue
            except:
                continue
    
    print("逆向计算未找到密码")
    return None

# 常见密码字典
COMMON_PASSWORDS = [
    # 基础密码
    "admin", "password", "123456", "admin123", "password123",
    "root", "administrator", "letmein", "welcome", "monkey",
    "12345678", "123456789", "123123", "111111", "qwerty",
    
    # CTF相关
    "ctf", "flag", "ctfshow", "ctf2024", "ctf2025", "ctf2026",
    "admin2024", "admin2025", "admin2026",
    "password2024", "password2025", "password2026",
    
    # 特殊组合
    "ctf{", "flag{", "CTF{", "FLAG{",
    "ctfshow{", "CTFSHOW{",
    
    # 数字组合
    "123", "1234", "12345", "1234567", "12345678", "1234567890",
    "000000", "111111", "222222", "333333", "444444", "555555",
    "666666", "777777", "888888", "999999",
    
    # 字母组合
    "abc123", "test123", "demo123", "adminadmin", "passwordpassword",
    
    # 可能的base64解码结果
    "dGVzdA==", "YWRtaW4=", "cGFzc3dvcmQ=",
]

# 扩展字典 - 生成更多可能的密码
def generate_password_variations(base_passwords):
    variations = []
    
    for pwd in base_passwords:
        variations.append(pwd)
        variations.append(pwd.upper())
        variations.append(pwd.capitalize())
        
        # 添加常见后缀
        for suffix in ['123', '!', '@', '#', '$', '%', '^', '&', '*', '?']:
            variations.append(pwd + suffix)
        
        # 添加常见前缀
        for prefix in ['ctf', 'CTF', 'flag', 'FLAG', 'show', 'SHOW']:
            variations.append(prefix + pwd)
            variations.append(pwd + prefix)
    
    return list(set(variations))  # 去重

# 暴力破解函数
def brute_force_passwords(password_list):
    print(f"\n=== 开始暴力破解 ({len(password_list)}个密码) ===")
    
    found = False
    for i, password in enumerate(password_list):
        if validate_password(password):
            print(f"\n找到密码: {password}")
            print(f"  尝试次数: {i+1}")
            found = True
            return password
        
        # 每100个密码显示一次进度
        if (i + 1) % 100 == 0:
            print(f"  进度: {i+1}/{len(password_list)}")
    
    if not found:
        print("未在字典中找到密码")
    return None

# 生成更多密码尝试
def generate_pattern_passwords():
    """生成基于模式的密码"""
    passwords = []
    
    # 简单数字序列
    for i in range(1000, 10000):
        passwords.append(str(i))
    
    # 字母数字组合
    simple_patterns = [
        "admin", "ctf", "flag", "show", "password",
        "root", "user", "login", "secret", "key"
    ]
    
    for pattern in simple_patterns:
        # 添加数字后缀
        for i in range(100):
            passwords.append(pattern + str(i))
            passwords.append(pattern + str(i).zfill(2))
            passwords.append(pattern + str(i).zfill(3))
        
        # 添加常见符号
        for symbol in ['!', '@', '#', '$', '%', '^', '&', '*']:
            passwords.append(pattern + symbol)
            passwords.append(pattern + symbol + "123")
    
    return passwords

def main():
    print("CTFshow密码爆破工具")
    print("=" * 50)
    
    # 方法1: 尝试逆向计算
    password = reverse_password()
    
    if password:
        print(f"\n通过逆向计算找到密码: {password}")
        return
    
    # 方法2: 常见密码字典
    print("\n=== 方法2: 尝试常见密码字典 ===")
    all_passwords = generate_password_variations(COMMON_PASSWORDS)
    print(f"生成的密码字典大小: {len(all_passwords)}")
    
    password = brute_force_passwords(all_passwords)
    
    if password:
        print(f"\n通过字典攻击找到密码: {password}")
        return
    
    # 方法3: 生成更多模式密码
    print("\n=== 方法3: 生成模式密码 ===")
    pattern_passwords = generate_pattern_passwords()
    print(f"生成的模式密码数量: {len(pattern_passwords)}")
    
    # 取前5000个尝试（避免太多）
    test_passwords = pattern_passwords[:5000]
    password = brute_force_passwords(test_passwords)
    
    if password:
        print(f"\n通过模式匹配找到密码: {password}")
        return
    
    # 方法4: 尝试直接提交到网站
    print("\n=== 方法4: 需要直接测试网站 ===")
    print("由于密码验证在客户端，我们可以:")
    print("1. 直接提交表单到 check.php")
    print("2. 使用Burp Suite进行爆破")
    print("3. 编写Python脚本发送POST请求")
    
    print("\n建议使用以下方法继续:")
    print("1. 安装Burp Suite")
    print("2. 配置代理拦截请求")
    print("3. 发送到Intruder模块进行爆破")
    print("4. 使用生成的密码字典")

if __name__ == "__main__":
    main()