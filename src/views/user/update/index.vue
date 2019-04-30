<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">
      个人资料
      <a class="saveBtn"
         slot="right"
         @click="save">保存</a>
    </x-header>
    <div class="content">
      <group title=""
             class="margin-bottom">
        <cell title="头像"
              :primary="'content'">
          <uploader :images="userLogoData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </cell>
        <x-input title="昵称"
                 placeholder="请输入您的昵称"
                 v-model="form.true_name"
                 :max="30"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <popup-radio title="性别"
                     placeholder="请选择性别"
                     :options="sexData"
                     v-model="form.user_sex">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择性别</p>
        </popup-radio>
        <datetime title="出生年月"
                  placeholder="请输选择您的出生年月"
                  v-model="form.user_birthday"
                  :min-year="1949"
                  :max-year="currentYear"></datetime>
        <x-input title="手机号"
                 placeholder="请输入您的手机号"
                 :max="11"
                 v-model="form.user_mobile"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <!--<x-input title="邮箱" placeholder="请输入您的邮箱" :max="20" v-model="form.user_email" placeholder-align="right" text-align="right"></x-input>-->
      </group>
    </div>
  </div>
</template>

<script>
import { Datetime, Group, PopupRadio, XInput, Cell, XHeader } from 'vux'
import Uploader from '@comps/uploader/uploader'
import { updateUser } from '@api'
import { mapState, mapMutations } from 'vuex'
import { SET_LOADING, SET_USER } from '@store/type'
import { removeAllSpace } from '@js/util'
export default {
  components: {
    XHeader,
    Datetime,
    Group,
    PopupRadio,
    XInput,
    Uploader,
    Cell
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      form: {},
      userLogoData: [],
      sexData: [
        { value: '男', key: '1' },
        { value: '女', key: '0' }
      ],
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING,
      setUser: SET_USER
    }),
    loadUser () {
      this.form.true_name = this.user.true_name
      this.form.user_sex = this.user.user_sex === '男' ? '1' : '0'

      this.form.user_birthday = this.user.user_birthday
      this.form.user_mobile = this.user.user_mobile
      this.userLogoData.push({
        url: this.user.head_img
        // this.form.user_email = this.user.user_email
      })
    },
    // 保存
    async save () {
      // if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.form.user_email)) {
      //   return this.$toasted.show('请输入正确的邮箱！')
      // }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(removeAllSpace(this.form.user_mobile))) {
        return this.$toasted.show('请输入正确的手机号！')
      }

      if (this.userLogoData.length >= 1) {
        this.form.head_img = this.userLogoData[0].url
      }

      let formData = new FormData()
      for (let key in this.form) {
        formData.append(key, this.form[key])
      }
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await updateUser(formData)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$toasted.show(res.msg)
        this.$set(this.user, 'true_name', res.data.true_name)
        this.$set(this.user, 'user_sex', res.data.user_sex === 0 ? '女' : '男')
        this.$set(this.user, 'user_birthday', res.data.user_birthday)
        this.$set(this.user, 'user_mobile', res.data.user_mobile)
        this.$set(this.user, 'user_email', res.data.user_email)
        this.$set(this.user, 'head_img', res.data.head_img)
      }
    }
  },
  created () {
    let self = this
    this.$store.dispatch('getUserInfo', () => {
      self.loadUser()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.title-slot {
  text-align: center;
  padding: 20px;
  color: $default_title_color;
}
</style>
