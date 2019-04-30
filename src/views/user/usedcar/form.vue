<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.params.id ? '修改二手车信息' : '添加二手车信息'}}
      <a class="saveBtn" slot="right" @click="submit">发布</a>
    </x-header>
    <div class="content">
      <div class="tooltip"  v-if="form.audit_status===2">
        <h3>拒绝原因</h3>
        <p>{{form.audit_reason || '无'}}</p>
      </div>
      <group>
        <uploader
          :title="'图片上传'"
          :max="8"
          :images="imgData"
          :handle-click="false"
          :show-header="true"
          :show-tip="true"
          :autoUpload="true"
          :uploadUrl="'/UploadFile/Upload'"
          :autoRemove="true"
          :removeUrl="'/UploadFile/Remove'"
        ></uploader>
        <x-input title="标题" placeholder="请输入标题" placeholder-align="right" text-align="right" v-model="form.article_title"></x-input>
      </group>
      <group>
        <x-input title="报价" placeholder="请输入报价" placeholder-align="right" text-align="right" v-model="fields.usedcar_bj.field_value"
                 :max="100000" :min="0"
                 @on-change="(value) => inputChange(value, fields.usedcar_bj)"></x-input>
        <x-input title="表显里程" placeholder="请输入表显里程" placeholder-align="right" text-align="right" v-model="fields.usedcar_bxlc.field_value"
                 :max="200000" :min="0"
                 @on-change="(value) => inputChange(value, fields.usedcar_bxlc)"></x-input>
        <x-input title="上牌城市" placeholder="请输入上牌城市" placeholder-align="right" text-align="right" v-model="fields.usedcar_spd.field_value"
                 @on-change="(value) => inputChange(value, fields.usedcar_spd)"></x-input>
        <datetime
          title="上牌时间" placeholder="请选择上牌时间" v-model="fields.usedcar_spsj.field_value" :min-year="1949" :max-year="currentYear"
          @on-confirm="(value) => datetimeConfirm(value, fields.usedcar_spsj)"></datetime>
        <x-input title="看车地址" placeholder="请输入看车地址" placeholder-align="right" text-align="right" v-model="fields.usedcar_kcdz.field_value"
                 @on-change="(value) => inputChange(value, fields.usedcar_kcdz)"></x-input>
      </group>

      <group>
        <popup-radio title="排放标准" placeholder="请选择排放标准" :options="fields.usedcar_pfbz.options" v-model="fields.usedcar_pfbz.field_value"
                     @on-change="(value) => radioChange(value, fields.usedcar_pfbz)">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择排放标准</p>
        </popup-radio>
        <popup-radio title="变速箱" placeholder="请选择变速箱" :options="fields.usedcar_bsx.options" v-model="fields.usedcar_bsx.field_value"
                     @on-change="(value) => radioChange(value, fields.usedcar_bsx)">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择变速箱</p>
        </popup-radio>
        <x-input title="排量" placeholder="请输入排量" placeholder-align="right" text-align="right" v-model="fields.usedcar_pl.field_value"
                 :max="200" :min="0"
                 @on-change="(value) => inputChange(value, fields.usedcar_pl)"></x-input>
        <popup-radio title="燃料类型" placeholder="请选择燃料类型" :options="fields.usedcar_rllx.options" v-model="fields.usedcar_rllx.field_value"
                     @on-change="(value) => radioChange(value, fields.usedcar_rllx)">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择燃料类型</p>
        </popup-radio>
      </group>

      <group>
        <x-input title="过户次数" placeholder="请输入过户次数" placeholder-align="right" text-align="right" v-model="fields.usedcar_ghcs.field_value"
                 :max="20" :min="0"
                 @on-change="(value) => inputChange(value, fields.usedcar_ghcs)"></x-input>
        <datetime
          title="交强险到期时间" placeholder="请选择交强险到期时间" v-model="fields.usedcar_jqx.field_value" :min-year="1949"
          @on-confirm="(value) => datetimeConfirm(value, fields.usedcar_jqx)"></datetime>
        <datetime
          title="年检到期时间" placeholder="请选择年检到期时间" v-model="fields.usedcar_njdq.field_value" :min-year="1949"
          @on-confirm="(value) => datetimeConfirm(value, fields.usedcar_njdq)"></datetime>
        <datetime
          title="商业险到期时间" placeholder="请选择商业险到期时间" v-model="fields.usedcar_syx.field_value" :min-year="1949"
          @on-confirm="(value) => datetimeConfirm(value, fields.usedcar_syx)"></datetime>
      </group>

      <group>
        <x-input title="联系人" placeholder="请输入联系人" placeholder-align="right" text-align="right" v-model="fields.usedcar_lxr.field_value"
                 @on-change="(value) => inputChange(value, fields.usedcar_lxr)"></x-input>
        <x-input title="联系电话" placeholder="请输入联系电话" placeholder-align="right" text-align="right" v-model="fields.usedcar_lxdh.field_value"
                 @on-change="(value) => inputChange(value, fields.usedcar_lxdh)"></x-input>
        <x-input title="微信" placeholder="请输入微信" placeholder-align="right" text-align="right" v-model="fields.usedcar_WeChat.field_value"
                 @on-change="(value) => inputChange(value, fields.usedcar_WeChat)"></x-input>
      </group>

      <group>
        <vue-html5-editor :content="form.article_content" :auto-height="true" @change="editorChange" :z-index="10"></vue-html5-editor>
      </group>
      <group></group>
    </div>
  </div>
</template>

<script>
  import { XHeader, XInput, XTextarea, Group, Cell, PopupRadio, Datetime } from 'vux'
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
      Uploader
    },
    data () {
      return {
        channel_code: this.$route.query.channel_code,
        form: {
          article_id: this.$route.params.id,
          article_title: null,
          article_image: null,
          article_content: '',
          article_attrjson: null,
          channel_id: null
        },
        fields: {
          // 报价
          usedcar_bj: {
            field_value: null
          },
          // 表显里程
          usedcar_bxlc: {
            field_value: null
          },
          // 上牌地
          usedcar_spd: {
            field_value: null
          },
          // 上牌时间
          usedcar_spsj: {
            field_value: null
          },
          // 看车地址
          usedcar_kcdz: {
            field_value: null
          },
          // 排放标准
          usedcar_pfbz: {
            field_value: null,
            options: []
          },
          // 变速箱
          usedcar_bsx: {
            field_value: null,
            options: []
          },
          // 排量
          usedcar_pl: {
            field_value: null
          },
          // 燃料类型
          usedcar_rllx: {
            field_value: null,
            options: []
          },
          // 过户次数
          usedcar_ghcs: {
            field_value: null
          },
          // 交强险到期时间
          usedcar_jqx: {
            field_value: null
          },
          // 年检到期时间
          usedcar_njdq: {
            field_value: null
          },
          // 商业险到期时间
          usedcar_syx: {
            field_value: null
          },
          // 联系人
          usedcar_lxr: {
            field_value: null
          },
          // 联系电话
          usedcar_lxdh: {
            field_value: null
          },
          // 微信
          usedcar_WeChat: {
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
      // 文本框变更
      inputChange (value, obj) {
        obj.field_valuename = value
      },
      // 多选变更
      radioChange (value, obj) {
        let findObj = obj.options.find(i => i.key === value)
        if (findObj) {
          obj.field_valuename = findObj.value
        }
      },
      // 富文本变更
      editorChange (value) {
        this.form.article_content = value
      },
      // 日期变更
      datetimeConfirm (value, obj) {
        obj.field_valuename = value
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

            let attrList = JSON.parse(res.data.article.article_attrjson)
            attrList.map(i => {
              let field = this.fields[i.field_code]
              if (field) {
                field.field_value = i.field_value.toString()
                field.field_valuename = i.field_valuename
              }
            })

            res.data.fileList.map(file => {
              this.imgData.push({
                url: file.file_url,
                name: file.file_name,
                ext: file.file_ext,
                size: file.file_size,
                type: file.file_type
              })
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
          this.fields = {
            ...this.fields,
            ...res.data
          }
          this.loadForm()
        }
      },
      // 验证
      isValid () {
        if (this.imgData.length < 1) {
          this.$toasted.show('请您至少上传一张图片！')
          return false
        }
        if (!this.form.article_title) {
          this.$toasted.show('请输入标题！')
          return false
        }
        if (!this.fields.usedcar_bj.field_value) {
          this.$toasted.show('请输入您的出售报价！')
          return false
        }
        if (!this.fields.usedcar_bxlc.field_value) {
          this.$toasted.show('请输入您的表显里程！')
          return false
        }
        if (!this.fields.usedcar_spd.field_value) {
          this.$toasted.show('请输入您的上牌城市！')
          return false
        }
        if (!this.fields.usedcar_spsj.field_value) {
          this.$toasted.show('请选择您的上牌时间！')
          return false
        }
        if (!this.fields.usedcar_kcdz.field_value) {
          this.$toasted.show('请输入您的看车地址！')
          return false
        }
        if (!this.fields.usedcar_pfbz.field_value) {
          this.$toasted.show('请选择您的排放标准！')
          return false
        }
        if (!this.fields.usedcar_bsx.field_value) {
          this.$toasted.show('请选择您的变速箱！')
          return false
        }
        if (!this.fields.usedcar_pl.field_value) {
          this.$toasted.show('请输入您的排量！')
          return false
        }
        if (!this.fields.usedcar_rllx.field_value) {
          this.$toasted.show('请选择您的燃料类型！')
          return false
        }
        if (!this.fields.usedcar_ghcs.field_value) {
          this.$toasted.show('请输入您的过户次数！')
          return false
        }
        if (!this.fields.usedcar_lxr.field_value) {
          this.$toasted.show('请输入您的联系人！')
          return false
        }
        if (!this.fields.usedcar_lxdh.field_value) {
          this.$toasted.show('请输入您的联系电话！')
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

        if (this.imgData.length > 0) {
          this.form.article_image = this.imgData[0].url

          this.imgData.map(file => {
            fileList.push({
              file_name: file.name,
              file_ext: file.ext,
              file_size: file.size,
              file_url: file.url,
              file_type: file.type
            })
          })
        }

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
</style>

<style lang="scss">
  .weui-textarea {
    text-align: right;
  }

  .vue-html5-editor {
    border-radius: 0;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
</style>
