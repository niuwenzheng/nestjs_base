import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

/**
 * 详细配置文件地址： node_modules/lib/well-known/services
 */
const transporter = createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'you_mail@163.com', //发送方邮箱
    pass: 'you_mail_password', //发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
  },
});

function sendMail(info) {
  return new Promise<object>((resolve, reject) => {
    transporter.sendMail(info, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

@Injectable()
export class MailService {
  /**
   * 发送邮件
   * @param {string} to 收件方邮箱
   * @param {string} title 内容标题
   * @param {string} content 邮件内容
   * @param {Function} callback 回调函数（内置参数）
   *
   */
  async mail(to: string, title: string, content: string): Promise<boolean> {
    const info = {
      from: 'you_mail@163.com', //发送方邮箱
      to: to,
      subject: title,
      text: content,
      //html: '<h1>这里内容</h1>'，text和html任选其一即可
    };
    //发送邮件
    let ret = true;
    try {
      await sendMail(info);
    } catch (error) {
      ret = false;
    }
    return ret;
  }

  /**
   * 发送邮件
   * @param {string} to 收件方邮箱
   * @param {string} title 内容标题
   * @param {string} content 邮件内容
   * @param {Function} callback 回调函数（内置参数）
   *
   */
  async mailCode(to: string, code: string) {
    const subject = 'webook验证码';
    const text = `您的验证码是${code},请在5分钟之内使用`;
    return await this.mail(to, subject, text);
  }
}
