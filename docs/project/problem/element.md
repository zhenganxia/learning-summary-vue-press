## 添加验证码倒计时
```vue
<FormItem prop="smsCode">
    <div class="flex-between">
    <Input
        v-model.trim="admin.smsCode"
        maxlength="6"
        placeholder="请输入嗨长城验证码"
        style="width: 70%"
        size="large"
        clearable
        @on-enter="login"
        class="smsCode"
    ></Input>
    <Button
        class="get_vcode"
        :disabled="codeMsg.isCode"
        size="large"
        :loading="codeMsg.loading"
        @click="getCode"
        >{{ smsButtonText }}</Button
    >
    </div>
</FormItem>

data () {
    return {
      codeMsg: {
        loading: false,
        waitingTime: 0,
        text: "发送验证码",
        smsTime: 60, // 倒计时周期
        isCode: false, // 验证码按钮置灰
      },
    }
  },
 computed: {
    // 验证码按钮展示文本
    smsButtonText() {
    return this.codeMsg.isCode
      ? this.codeMsg.smsTime + "s后重试"
      : this.codeMsg.text;
    },
  },
methods: {
    getCode() {
      const params = {};
      this.codeMsg.loading = true;
      接口(params)
        .then((res) => {
          if (res.data.code === "000000") {
            this.$Message.success("验证码已发送");
            // 触发定时器
            countDown();
          } else {
            this.$Message.error(res.data.description);
          }
        })
        .catch((error) => {
          this.$Message.error(error.description);
        })
        .finally(() => {
          this.codeMsg.loading = false;
        });

      // 倒计时
      const countDown = () => {
        this.intervalBtn = setInterval(() => {
          this.codeMsg.isCode = true;
          if (this.codeMsg.smsTime <= 0) {
            clearInterval(this.intervalBtn);
            Object.assign(this.codeMsg, {
              text: "重新获取",
              isCode: false,
              smsTime: 60,
            });
          } else {
            this.codeMsg.smsTime--;
          }
        }, 1000);
      };
    },
  },
```