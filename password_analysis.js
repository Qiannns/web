// CTFshow密码验证逻辑分析
// 从HTML中提取的JavaScript验证函数

const correctPassword = "SXpVRlF4TTFVelJtdFNSazB3VTJ4U1UwNXFSWGRVVlZrOWNWYzU=";

function validatePassword(input) {
    // 步骤1: 对输入进行base64编码
    let encoded = btoa(input);
    
    // 步骤2: 在编码后添加 'xH7jK' 并进行base64编码，然后移除前3个字符
    encoded = btoa(encoded + 'xH7jK').slice(3);
    
    // 步骤3: 反转字符串并进行base64编码
    encoded = btoa(encoded.split('').reverse().join(''));
    
    // 步骤4: 在字符串前后分别添加 'aB3' 和 'qW9'，进行base64编码，然后移除前2个字符
    encoded = btoa('aB3' + encoded + 'qW9').substr(2);
    
    // 步骤5: 对整个结果再进行一次base64编码
    return btoa(encoded) === correctPassword;
}

// 让我们尝试理解这个逻辑
console.log("正确密码的base64:", correctPassword);
console.log("密码长度(base64):", correctPassword.length);

// 尝试解码正确密码看看中间状态
try {
    // 第一步：解码correctPassword
    const step5 = atob(correctPassword);
    console.log("第5步结果（步骤4的base64编码后）:", step5);
    console.log("第5步长度:", step5.length);
    
    // 由于步骤4是：btoa('aB3' + encoded + 'qW9').substr(2)
    // 我们需要逆转这个过程
    // 步骤4的反向：encoded = atob('XX' + step5) 但这里缺失了前2个字符
    // 实际上：btoa('aB3' + X + 'qW9').substr(2) = step5
    // 所以：btoa('aB3' + X + 'qW9') = 'XX' + step5
    
    // 让我们尝试重建
    const step4_full = 'XX' + step5; // 假设前2个字符是'XX'（实际上需要计算）
    console.log("步骤4完整base64:", step4_full);
    
    // 解码步骤4
    const step3_with_padding = atob(step4_full); // 应该是 'aB3' + encoded + 'qW9'
    console.log("步骤3+padding:", step3_with_padding);
    
    // 移除前后的'aB3'和'qW9'
    if (step3_with_padding.startsWith('aB3') && step3_with_padding.endsWith('qW9')) {
        const step3 = step3_with_padding.slice(3, -3);
        console.log("步骤3结果（反转前）:", step3);
        
        // 步骤3是：btoa(encoded.split('').reverse().join(''))
        const step2_reversed = atob(step3);
        console.log("步骤2反转后:", step2_reversed);
        
        // 反转回来
        const step2 = step2_reversed.split('').reverse().join('');
        console.log("步骤2结果:", step2);
        
        // 步骤2是：btoa(encoded + 'xH7jK').slice(3)
        // 所以：btoa(encoded + 'xH7jK') = 'XXX' + step2
        const step1_with_suffix_full = 'XXX' + step2;
        console.log("步骤1+后缀完整base64:", step1_with_suffix_full);
        
        const step1_with_suffix = atob(step1_with_suffix_full);
        console.log("步骤1+suffix:", step1_with_suffix);
        
        // 移除'xH7jK'后缀
        if (step1_with_suffix.endsWith('xH7jK')) {
            const original_base64 = step1_with_suffix.slice(0, -5);
            console.log("原始base64密码:", original_base64);
            
            // 解码原始base64得到密码
            try {
                const original_password = atob(original_base64);
                console.log("可能的原始密码:", original_password);
                console.log("密码长度:", original_password.length);
            } catch (e) {
                console.log("无法解码原始base64:", e.message);
            }
        }
    }
} catch (e) {
    console.log("解码错误:", e.message);
}

// 让我们尝试暴力破解
console.log("\n=== 暴力破解方法 ===");
console.log("由于验证逻辑在客户端，我们可以：");
console.log("1. 尝试常见密码字典");
console.log("2. 尝试base64编码的常见密码");
console.log("3. 分析可能的密码模式");

// 常见密码列表
const commonPasswords = [
    "admin", "password", "123456", "admin123", "password123",
    "ctf", "flag", "ctfshow", "ctf2024", "admin2024",
    "root", "administrator", "letmein", "welcome", "monkey",
    "12345678", "123456789", "123123", "111111", "qwerty"
];

console.log("\n尝试常见密码:");
for (const pwd of commonPasswords) {
    if (validatePassword(pwd)) {
        console.log("✓ 找到密码:", pwd);
        break;
    }
}

// 让我们尝试编写一个逆向函数来找到密码
console.log("\n=== 逆向分析 ===");
console.log("正确的base64密码:", correctPassword);

// 尝试直接逆向计算
function reversePassword() {
    // 步骤1: 解码正确密码
    const step5 = atob(correctPassword);
    
    // 我们需要找到步骤4的结果
    // 步骤4: btoa('aB3' + X + 'qW9').substr(2) = step5
    // 所以: btoa('aB3' + X + 'qW9') = '??' + step5
    
    // 尝试所有可能的2字符前缀
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    
    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < chars.length; j++) {
            const prefix = chars[i] + chars[j];
            const step4_full = prefix + step5;
            
            try {
                const step4_decoded = atob(step4_full);
                
                // 检查是否符合 'aB3' + X + 'qW9' 格式
                if (step4_decoded.startsWith('aB3') && step4_decoded.endsWith('qW9')) {
                    const step3 = step4_decoded.slice(3, -3);
                    console.log("找到有效前缀:", prefix);
                    console.log("步骤3:", step3);
                    
                    // 继续逆向
                    const step2_reversed = atob(step3);
                    const step2 = step2_reversed.split('').reverse().join('');
                    
                    // 现在需要找到步骤1
                    // 步骤2: btoa(encoded + 'xH7jK').slice(3) = step2
                    // 所以: btoa(encoded + 'xH7jK') = '???' + step2
                    
                    for (let k = 0; k < chars.length; k++) {
                        for (let l = 0; l < chars.length; l++) {
                            for (let m = 0; m < chars.length; m++) {
                                const prefix2 = chars[k] + chars[l] + chars[m];
                                const step1_full = prefix2 + step2;
                                
                                try {
                                    const step1_decoded = atob(step1_full);
                                    
                                    if (step1_decoded.endsWith('xH7jK')) {
                                        const original_base64 = step1_decoded.slice(0, -5);
                                        console.log("找到第二前缀:", prefix2);
                                        console.log("原始base64:", original_base64);
                                        
                                        try {
                                            const password = atob(original_base64);
                                            console.log("可能的密码:", password);
                                            return password;
                                        } catch (e) {
                                            // 继续尝试
                                        }
                                    }
                                } catch (e) {
                                    // 无效base64，继续
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                // 无效base64，继续
            }
        }
    }
    
    return null;
}

console.log("\n开始逆向计算...");
const foundPassword = reversePassword();
if (foundPassword) {
    console.log("✓ 通过逆向找到密码:", foundPassword);
} else {
    console.log("✗ 逆向计算未找到密码");
}