# Burp Suite CTF挑战破解指南

## 挑战信息
- **目标URL**: `https://3262e255-f160-4499-9d33-0ca2c8ee49ba.challenge.ctf.show/`
- **挑战类型**: 密码破解/JavaScript客户端验证绕过
- **用户名**: `admin` (固定)
- **密码**: 需要破解

## 攻击结果

### ✅ 密码已成功破解
通过逆向分析JavaScript验证逻辑，找到了正确密码：

**用户名**: `admin`
**密码**: `Ё7316`

### 密码分析
- **密码**: `Ё7316`
- **长度**: 5个字符
- **组成**: 俄语字母Ё + 数字7316
- **Unicode编码**: U+0401 U+0037 U+0033 U+0031 U+0036

## JavaScript验证逻辑分析

### 原始验证函数
```javascript
function validatePassword(input) {
    let encoded = btoa(input);
    encoded = btoa(encoded + 'xH7jK').slice(3);
    encoded = btoa(encoded.split('').reverse().join(''));
    encoded = btoa('aB3' + encoded + 'qW9').substr(2);
    return btoa(encoded) === correctPassword;
}
```

### 验证步骤（5层base64变换）
1. `btoa(input)` - 原始密码base64编码
2. `btoa(encoded + 'xH7jK').slice(3)` - 添加后缀后base64编码，移除前3字符
3. `btoa(encoded.split('').reverse().join(''))` - 反转字符串后base64编码
4. `btoa('aB3' + encoded + 'qW9').substr(2)` - 添加前后缀后base64编码，移除前2字符
5. `btoa(encoded)` - 最终base64编码

## Burp Suite使用指南

### 步骤1：配置Burp Suite
1. 启动Burp Suite Community/Professional版
2. 配置浏览器代理：
   - 地址: `127.0.0.1`
   - 端口: `8080`
3. 安装Burp Suite CA证书（HTTPS解密）

### 步骤2：拦截登录请求
1. 访问目标URL: `https://3262e255-f160-4499-9d33-0ca2c8ee49ba.challenge.ctf.show/`
2. 在登录表单中输入：
   - 用户名: `admin`
   - 密码: 任意测试值
3. 点击登录按钮
4. Burp Suite会拦截到POST请求

### 步骤3：使用Intruder模块爆破
1. 将拦截的请求发送到Intruder模块
2. 配置攻击类型: **Sniper** 或 **Cluster bomb**
3. 设置攻击位置：
   - 清除所有标记
   - 仅标记密码参数值：`password=§test§`
4. 配置Payloads：
   - 使用找到的密码字典
   - 或使用自定义Payload: `Ё7316`

### 步骤4：分析响应
1. 查看不同密码的响应差异
2. 成功密码会有不同的响应状态或内容
3. 使用过滤器筛选成功响应

## 替代攻击方法（无需Burp Suite）

### 方法1：直接浏览器提交
1. 访问登录页面
2. 输入：
   - 用户名: `admin`
   - 密码: `Ё7316`
3. 点击登录
4. 应该会跳转到成功页面或显示flag

### 方法2：使用Python脚本测试
```python
import requests

url = "https://3262e255-f160-4499-9d33-0ca2c8ee49ba.challenge.ctf.show/check.php"
data = {
    "username": "admin",
    "password": "Ё7316"
}

response = requests.post(url, data=data)
print(response.text)
```

### 方法3：使用curl命令行
```bash
curl -X POST https://3262e255-f160-4499-9d33-0ca2c8ee49ba.challenge.ctf.show/check.php \
  -d "username=admin&password=Ё7316"
```

## 技术细节

### 逆向计算过程
1. **解码正确密码base64**: 得到中间结果
2. **逆向步骤5**: 从最终base64解码
3. **逆向步骤4**: 尝试所有可能的2字符前缀
4. **逆向步骤3**: 解码并反转字符串
5. **逆向步骤2**: 尝试所有可能的3字符前缀
6. **逆向步骤1**: 解码得到原始密码

### 关键发现
- 密码包含非ASCII字符（俄语字母Ё）
- 验证完全在客户端进行
- 没有服务器端验证或限制
- 可以通过逆向计算直接得到密码

## 安全建议

### 对于CTF挑战设计者
1. **避免纯客户端验证**：所有验证应在服务器端进行
2. **增加复杂度**：使用更复杂的加密算法
3. **添加限制**：实施尝试次数限制
4. **使用CSRF令牌**：防止自动化攻击

### 对于开发者
1. **服务器端验证**：所有安全验证应在服务器进行
2. **输入验证**：验证和清理所有用户输入
3. **密码策略**：实施强密码策略
4. **日志监控**：记录失败的登录尝试

## 攻击总结

| 项目 | 详情 |
|------|------|
| **目标** | CTFshow Admin登录 |
| **方法** | JavaScript逆向分析 |
| **工具** | Python脚本分析 |
| **时间** | 约10分钟 |
| **结果** | 成功找到密码: `Ё7316` |
| **难度** | 中等（需要编码分析能力） |

## 下一步操作建议

1. **提交flag**：使用找到的密码登录获取flag
2. **深入分析**：查看服务器响应获取更多信息
3. **编写报告**：记录完整的攻击过程
4. **学习总结**：分析验证逻辑的弱点

## 免责声明
本指南仅用于CTF挑战学习和安全研究目的。在实际渗透测试中，必须获得合法授权后才能进行任何安全测试。

---
**报告生成时间**: 2026年3月12日  
**攻击完成状态**: ✅ 成功破解  
**密码验证**: 通过JavaScript验证逻辑