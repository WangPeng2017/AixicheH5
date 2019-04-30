<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.params.id ? '修改求职' : '添加求职'}}
      <a class="saveBtn"
         slot="right"
         @click="submit">发布</a>
    </x-header>
    <div class="content">
      <div class="tooltip"
           v-if="form.audit_status===2">
        <h3>拒绝原因</h3>
        <p>{{form.audit_reason || '无'}}</p>
      </div>
      <group>
        <cell title="头像"
              :primary="'content'">
          <uploader :images="imgData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </cell>
      </group>
      <group>
        <x-input title="姓名"
                 placeholder="请输入姓名"
                 placeholder-align="right"
                 text-align="right"
                 v-model="fields.jobhunting_xm.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_xm)"></x-input>
        <popup-radio title="性别"
                     placeholder="请选择性别"
                     :options="fields.jobhunting_xb.options"
                     v-model="fields.jobhunting_xb.field_value"
                     @on-change="(value) => radioChange(value, fields.jobhunting_xb)">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择性别</p>
        </popup-radio>
        <x-input title="年龄"
                 placeholder="请输入年龄"
                 placeholder-align="right"
                 text-align="right"
                 :max="80"
                 :min="1"
                 v-model="fields.jobhunting_nl.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_nl)"></x-input>
        <x-input title="现居地"
                 placeholder="请输入现居地"
                 placeholder-align="right"
                 text-align="right"
                 v-model="fields.jobhunting_xjd.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_xjd)"></x-input>
        <x-input title="手机号码"
                 placeholder="请输入手机号码"
                 placeholder-align="right"
                 text-align="right"
                 :max="11"
                 v-model="fields.jobhunting_sj.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_sj)"></x-input>
        <x-input title="邮箱/微信"
                 placeholder="请输入邮箱或微信"
                 placeholder-align="right"
                 text-align="right"
                 v-model="fields.jobhunting_yx.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_yx)"></x-input>
      </group>
      <group>
        <datetime title="毕业时间"
                  placeholder="请选择毕业时间"
                  v-model="fields.jobhunting_bysj.field_value"
                  :min-year="1949"
                  :max-year="currentYear"
                  @on-confirm="(value) => datetimeConfirm(value, fields.jobhunting_bysj)"></datetime>
        <popup-radio title="最高学历"
                     placeholder="请选择最高学历"
                     :options="fields.jobhunting_zgxl.options"
                     v-model="fields.jobhunting_zgxl.field_value"
                     @on-change="(value) => radioChange(value, fields.jobhunting_zgxl)">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择最高学历</p>
        </popup-radio>
        <x-input title="毕业院校"
                 placeholder="请输入毕业院校"
                 placeholder-align="right"
                 text-align="right"
                 v-model="fields.jobhunting_byyx.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_byyx)"></x-input>
      </group>

      <group>
        <x-input title="求职区域"
                 placeholder="请输入求职区域"
                 placeholder-align="right"
                 text-align="right"
                 v-model="fields.jobhunting_qzqy.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_qzqy)"></x-input>
        <popup-radio title="目标职位"
                     placeholder="请选择目标职位"
                     :options="fields.jobhunting_mbzw.options"
                     v-model="fields.jobhunting_mbzw.field_value"
                     @on-change="(value) => radioChange(value, fields.jobhunting_mbzw)">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择目标职位</p>
        </popup-radio>
        <cell title="技能特长"
              primary="content"
              :value="fields.jobhunting_jntc.field_valuename || '请选择技能特长'"
              is-link
              @click.native="fields.jobhunting_jntc.showPopup=true"></cell>
        <div v-transfer-dom>
          <popup v-model="fields.jobhunting_jntc.showPopup"
                 class="checker-popup">
            <div class="checkbox">
              <p class="checkbox-title">请选择技能特长</p>
              <checker :max="10"
                       type="checkbox"
                       v-model="fields.jobhunting_jntc.selectVals"
                       default-item-class="check-item"
                       selected-item-class="check-item-selected">
                <checker-item v-for="(item, index) in fields.jobhunting_jntc.vals"
                              :value="item"
                              :key="index"
                              @on-item-click="(value, disabled) => checkChange(value, disabled, fields.jobhunting_jntc)"> {{ fields.jobhunting_jntc.names[index] }} </checker-item>
              </checker>
            </div>
          </popup>
        </div>
        <x-input title="期望薪金"
                 placeholder="请输入期望薪金"
                 placeholder-align="right"
                 text-align="right"
                 type="number"
                 :max="10000"
                 :min="0"
                 v-model="fields.jobhunting_qdxj.field_value"
                 @on-change="(value) => inputChange(value, fields.jobhunting_qdxj)"></x-input>
      </group>

      <group>
        <popup-radio title="工作经验"
                     placeholder="请选择工作经验"
                     :options="fields.jobhunting_gzjy.options"
                     v-model="fields.jobhunting_gzjy.field_value"
                     @on-change="(value) => radioChange(value, fields.jobhunting_gzjy)">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择工作经验</p>
        </popup-radio>
        <x-textarea title="工作经历"
                    placeholder="请输入工作经历"
                    v-model="fields.jobhunting_gzjl.field_value"
                    :max="200"
                    @on-change="(value) => inputChange(value, fields.jobhunting_gzjl)"></x-textarea>
        <x-textarea title="自我评价"
                    placeholder="请输入自我评价"
                    v-model="fields.jobhunting_grjl.field_value"
                    :max="200"
                    @on-change="(value) => inputChange(value, fields.jobhunting_grjl)"></x-textarea>
      </group>

      <group></group>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, XTextarea, Group, Cell, PopupRadio, Datetime, Checker, CheckerItem, Popup, TransferDom } from 'vux'
import Uploader from '@comps/uploader/uploader'
import { getArticleFieldList, submitArticle, getArticleDetail } from '@api'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import qs from 'qs'

export default {
  components: {
    XHeader,
    XInput,
    XTextarea,
    Group,
    Cell,
    PopupRadio,
    Datetime,
    Checker,
    CheckerItem,
    Popup,
    TransferDom,
    Uploader
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      channel_code: this.$route.query.channel_code,
      form: {
        article_id: this.$route.params.id,
        article_title: null,
        article_image: null,
        article_attrjson: null
      },
      fields: {
        // 姓名
        jobhunting_xm: {
          field_value: null
        },
        // 性别
        jobhunting_xb: {
          field_value: null,
          options: []
        },
        // 年龄
        jobhunting_nl: {
          field_value: null
        },
        // 现居地
        jobhunting_xjd: {
          field_value: null
        },
        // 手机
        jobhunting_sj: {
          field_value: null
        },
        // 邮箱/微信
        jobhunting_yx: {
          field_value: null
        },
        // 毕业时间
        jobhunting_bysj: {
          field_value: null
        },
        // 最高学历
        jobhunting_zgxl: {
          field_value: null,
          options: []
        },
        // 毕业院校
        jobhunting_byyx: {
          field_value: null,
          field_valuename: null
        },
        // 工作经验
        jobhunting_gzjy: {
          field_value: null,
          options: []
        },
        // 工作经历
        jobhunting_gzjl: {
          field_value: null
        },
        // 个人简历
        jobhunting_grjl: {
          field_value: null
        },
        // 求职区域
        jobhunting_qzqy: {
          field_value: null
        },
        // 目标职位
        jobhunting_mbzw: {
          field_value: null,
          options: []
        },
        // 技能特长
        jobhunting_jntc: {
          field_value: null,
          options: [],
          showPopup: false,
          selectVals: [],
          vals: [],
          names: []
        },
        // 期望薪金
        jobhunting_qdxj: {
          field_value: null
        }
      },
      imgData: [],
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // input变更
    inputChange (value, obj) {
      obj.field_valuename = value
    },
    // 日期变更
    datetimeConfirm (value, obj) {
      obj.field_valuename = value
    },
    // 单选变更
    radioChange (value, obj) {
      let findObj = obj.options.find(i => i.key === value)
      if (findObj) {
        obj.field_valuename = findObj.value
      }
    },
    // 多选变更
    checkChange (value, disabled, obj) {
      this.$nextTick(() => {
        let nameArr = []
        let valueArr = []
        obj.selectVals.map(i => {
          let findObj = obj.options.find(obj => parseInt(obj.key) === i)
          if (findObj) {
            nameArr.push(findObj.value)
            valueArr.push(parseInt(findObj.key))
          }
        })
        obj.field_valuename = nameArr.join(',')
        obj.field_value = valueArr.join(',')
      })
    },
    // 加载基本信息
    async loadForm () {
      if (this.form.article_id) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getArticleDetail(this.form.article_id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.form = {
            ...this.form,
            ...res.data.article
          }
          if (this.form.article_image && this.form.article_image.length > 0) {
            this.imgData.push({
              url: this.form.article_image
            })
          }

          let attrList = JSON.parse(res.data.article.article_attrjson)
          attrList.map(i => {
            let field = this.fields[i.field_code]
            if (field) {
              field.field_value = i.field_value.toString()
              field.field_valuename = i.field_valuename
              // 多选多项内容加载
              if (field.control_type === 'checkboxgroup') {
                let selectVals = []
                field.field_value.split(',').map(i => {
                  selectVals.push(parseInt(i))
                })
                field.selectVals = selectVals
              }
            }
          })
        }
      }
    },
    // 加载扩展字段
    async loadFields () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getArticleFieldList(this.channel_code)
      this.setLoading(false)
      if (res && res.code === 200) {
        for (var key in res.data) {
          let field = res.data[key]
          if (field.control_type === 'checkboxgroup') {
            let vals = []
            let names = []
            field.options.map(i => {
              vals.push(parseInt(i.key))
              names.push(i.value)
            })
            field.vals = vals
            field.names = names
          }
        }
        this.fields = {
          ...this.fields,
          ...res.data
        }
        this.loadForm()
      }
    },
    // 验证
    isValid () {
      if (!this.fields.jobhunting_xm.field_value) {
        this.$toasted.show('请输入您的姓名！')
        return false
      }
      if (!this.fields.jobhunting_xb.field_value) {
        this.$toasted.show('请选择您的性别！')
        return false
      }
      if (!this.fields.jobhunting_nl.field_value) {
        this.$toasted.show('请输入您的年龄！')
        return false
      }
      if (!this.fields.jobhunting_sj.field_value) {
        this.$toasted.show('请输入您的手机号码！')
        return false
      }
      if (!this.fields.jobhunting_bysj.field_value) {
        this.$toasted.show('请选择您的毕业时间！')
        return false
      }
      if (!this.fields.jobhunting_zgxl.field_value) {
        this.$toasted.show('请选择您的最高学历！')
        return false
      }
      if (!this.fields.jobhunting_byyx.field_value) {
        this.$toasted.show('请输入您的毕业院校！')
        return false
      }

      if (!this.fields.jobhunting_gzjy.field_value) {
        this.$toasted.show('请选择您的工作经验！')
        return false
      }
      if (!this.fields.jobhunting_gzjl.field_value) {
        this.$toasted.show('请输入您的工作经历！')
        return false
      }
      if (!this.fields.jobhunting_grjl.field_value) {
        this.$toasted.show('请输入您的自我评价！')
        return false
      }
      if (!this.fields.jobhunting_mbzw.field_value) {
        this.$toasted.show('请选择您的目标职位！')
        return false
      }
      if (!this.fields.jobhunting_jntc.field_value) {
        this.$toasted.show('请选择您的技能特长！')
        return false
      }
      return true
    },
    // 下一步
    async submit () {
      if (!this.isValid()) {
        return
      }

      this.setLoading({
        status: true,
        opacity: 0
      })

      this.form.article_title = this.fields.jobhunting_mbzw.field_valuename
      if (this.imgData.length > 0) {
        this.form.article_image = this.imgData[0].url
      }

      // 生成attrjson
      let attrList = []
      let fieldrefList = []
      let fileList = []
      for (let key in this.fields) {
        let field = this.fields[key]
        if (field && field.field_value) {
          attrList.push({
            field_id: field.field_id.toString(),
            field_code: field.field_code,
            control_type: field.control_type,
            field_value: field.field_value,
            field_valuename: field.field_valuename
          })

          if (field.control_type === 'checkboxgroup') {
            let valueList = field.field_value.split(',')
            for (let i = 0; i < valueList.lenght; i++) {
              let value = valueList[i]
              fieldrefList.push({
                field_id: field.field_id,
                field_value: value
              })
            }
          } else if (field.control_type === 'radiogroup') {
            fieldrefList.push({
              field_id: field.field_id,
              field_value: field.field_value
            })
          } else if (field.control_type === 'checkbox') {
            fieldrefList.push({
              field_id: field.field_id,
              field_value: field.field_value
            })
          }
        }
      }
      this.form.article_attrjson = JSON.stringify(attrList)

      let res = await submitArticle(qs.stringify({
        channel_code: this.channel_code,
        article: this.form,
        fileList: fileList,
        fieldrefList: fieldrefList
      }))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$toasted.show(res.msg)
        this.$router.back()
      }
    }
  },
  created () {
    this.loadFields()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.content {
  height: calc(100% - #{$default_navbar_height});
}

.title-slot {
  text-align: center;
  padding: 20px;
  color: $default_title_color;
}

.tooltip {
  padding: 20px;
  margin: 20px;
  color: #df9d35;
  background: #fffbe6;
  p {
    margin-top: 10px;
    width: 100%;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}

.checkbox {
  background-color: #fff;
  padding: 20px 20px 40px;
  .checkbox-title {
    text-align: center;
    padding: 20px;
    color: $default_title_color;
  }
  .check-item {
    background-color: #ddd;
    color: #333;
    font-size: $default_font_size;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 10px;
  }
  .check-item-selected {
    background-color: #ff3b3b;
    color: #fff;
    margin: 10px;
  }
}
</style>

<style lang="scss">
.weui-textarea {
  text-align: right;
}
</style>
