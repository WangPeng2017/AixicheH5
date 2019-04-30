<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.params.id ? '修改转让信息' : '添加转让信息'}}
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
        <popup-radio title="物品分类" placeholder="请选择物品分类" :options="categoryOptions" v-model="form.channel_id">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择物品分类</p>
        </popup-radio>
      </group>
      <group>
        <x-input title="价格" placeholder="请输入价格" placeholder-align="right" text-align="right" v-model="fields.transfer_jg.field_value"
                 :max="100000" :min="0"
                 @on-change="(value) => inputChange(value, fields.transfer_jg)"></x-input>
        <x-input title="地址" placeholder="请输入地址" placeholder-align="right" text-align="right" v-model="fields.transfer_dz.field_value"
                 @on-change="(value) => inputChange(value, fields.transfer_dz)"></x-input>
        <x-input title="联系人" placeholder="请输入联系人" placeholder-align="right" text-align="right" v-model="fields.transfer_lxr.field_value"
                 @on-change="(value) => inputChange(value, fields.transfer_lxr)"></x-input>
        <x-input title="联系电话" placeholder="请输入联系电话" placeholder-align="right" text-align="right" v-model="fields.transfer_lxdh.field_value"
                 @on-change="(value) => inputChange(value, fields.transfer_lxdh)"></x-input>
        <x-input title="其他联系方式" placeholder="请输入其他联系方式" placeholder-align="right" text-align="right" v-model="fields.transfer_qtlx.field_value"
                 @on-change="(value) => inputChange(value, fields.transfer_qtlx)"></x-input>
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
  import { getArticleFieldList, submitArticle, getArticleDetail, getArticleCategoryList } from '@api'
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
          // 价格
          transfer_jg: {
            field_value: null
          },
          // 地址
          transfer_dz: {
            field_value: null
          },
          // 联系人
          transfer_lxr: {
            field_value: null
          },
          // 联系电话
          transfer_lxdh: {
            field_value: null
          },
          // 其他联系
          transfer_qtlx: {
            field_value: null
          }
        },
        imgData: [],
        categoryOptions: []
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
      // 富文本变更
      editorChange (value) {
        this.form.article_content = value
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
      // 加载分类
      async loadCategorys () {
        let res = await getArticleCategoryList(this.channel_code)
        if (res && res.code === 200) {
          res.data.map(i => {
            this.categoryOptions.push({
              key: i.id,
              value: i.text
            })
          })
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
        if (!this.fields.transfer_jg.field_value) {
          this.$toasted.show('请输入您的转让价格！')
          return false
        }
        if (!this.fields.transfer_dz.field_value) {
          this.$toasted.show('请输入您的转让地址！')
          return false
        }
        if (!this.fields.transfer_lxr.field_value) {
          this.$toasted.show('请输入您的联系人！')
          return false
        }
        if (!this.fields.transfer_lxdh.field_value) {
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
      this.loadCategorys()
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
