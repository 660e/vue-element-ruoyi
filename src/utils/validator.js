function nullable(value, callback) {
  if (value === undefined || value === null || value === '') {
    callback();
    return;
  }
}

export const email = { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] };
export const required = { required: true, message: '此项为必填项', trigger: ['blur', 'change'] };

export const mobilePattern = /^1[3-9]\d{9}$/;
export const mobile = {
  validator: (_, value, callback) => {
    nullable(value, callback);

    if (!mobilePattern.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  },
  trigger: ['blur', 'change'],
};
