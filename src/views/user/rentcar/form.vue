<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.params.id ? '修改租车信息' : '添加租车信息'}}
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
        <popup-radio title="车型" placeholder="请选择车型" :options="fields.rentalcar_cx.options" v-model="fields.rentalcar_cx.field_value"
                     @on-change="(value) => radioChange(value, fields.rentalcar_cx)">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择车型</p>
        </popup-radio>
        <x-input title="时租价" placeholder="请输入时租价" placeholder-align="right" text-align="right" v-model="fields.rentalcar_szj.field_value"
                 :max="100000" :min="0"
                 @on-change="(value) => inputChange(value, fields.rentalcar_szj)"></x-input>
        <x-input title="日租价" placeholder="请输入日租价" placeholder-align="right" text-align="right" v-model="fields.rentalcar_rzj.field_value"
                 :max="100000" :min="0"
                 @on-change="(value) => inputChange(value, fields.rentalcar_rzj)"></x-input>
        <x-input title="月租价" placeholder="请输入月租价" placeholder-align="right" text-align="right" v-model="fields.rentalcar_yzj.field_value"
                 :max="100000" :min="0"
                 @on-change="(value) => inputChange(value, fields.rentalcar_yzj)"></x-input>
        <cell title="使用范围" primary="content" :value="fields.rentalcar_syfw.field_valuename || '请选择使用范围'" is-link @click.native="fields.rentalcar_syfw.showPopup=true"></cell>
        <div v-transfer-dom>
          <popup v-model="fields.rentalcar_syfw.showPopup" class="checker-popup">
            <div class="checkbox">
              <p class="checkbox-title">请选择使用范围</p>
              <checker
                :max="10"
                type="checkbox"
                v-model="fields.rentalcar_syfw.selectVals"
                default-item-class="check-item"
                selected-item-class="check-item-selected">
                <checker-item v-for="(item, index) in fields.rentalcar_syfw.vals" :value="item" :key="index" @on-item-click="(value, disabled) => checkChange(value, disabled, fields.rentalcar_syfw)"> {{ fields.rentalcar_syfw.names[index] }} </checker-item>
              </checker>
            </div>
          </popup>
        </div>

        <x-input title="限行区域" placeholder="请输入限行区域" placeholder-align="right" text-align="right" v-model="fields.rentalcar_xxqy.field_value"
                 @on-change="(value) => inputChange(value, fields.rentalcar_xxqy)"></x-input>
        <x-textarea title="租金描述" placeholder="请输入租金描述" v-model="fields.rentalcar_zjms.field_value" :max="200"
                    @on-change="(value) => inputChange(value, fields.rentalcar_zjms)"></x-textarea>
      </group>

      <group>
        <x-input title="联系人" placeholder="请输入联系人" placeholder-align="right" text-align="right" v-model="fields.rentalcar_lxr.field_value"
                 @on-change="(value) => inputChange(value, fields.rentalcar_lxr)"></x-input>
        <x-input title="联系电话" placeholder="请输入联系电话" placeholder-align="right" text-align="right" v-model="fields.rentalcar_sj.field_value"
                 @on-change="(value) => inputChange(value, fields.rentalcar_sj)"></x-input>
        <x-input title="其他联系方式" placeholder="请输入其他联系方式" placeholder-align="right" text-align="right" v-model="fields.rentalcar_qtlx.field_value"
                 @on-change="(value) => inputChange(value, fields.rentalcar_qtlx)"></x-input>
        <x-input title="取车地址" placeholder="请输入取车地址" placeholder-align="right" text-align="right" v-model="fields.rentalcar_qcdz.field_value"
                 @on-change="(value) => inputChange(value, fields.rentalcar_qcdz)"></x-input>
      </group>

      <group>
        <vue-html5-editor :content="form.article_content" :auto-height="true" @change="editorChange" :z-index="10"></vue-html5-editor>
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
          article_content: '',
          article_attrjson: null,
          channel_id: null
        },
        fields: {
          // 车型
          rentalcar_cx: {
            field_value: null,
            options: []
          },
          // 时租价
          rentalcar_szj: {
            field_value: null
          },
          // 日租价
          rentalcar_rzj: {
            field_value: null
          },
          // 月租价
          rentalcar_yzj: {
            field_value: null
          },
          // 租金描述
          rentalcar_zjms: {
            field_value: null
          },
          // 使用范围
          rentalcar_syfw: {
            field_value: null,
            options: [],
            showPopup: false,
            selectVals: [],
            vals: [],
            names: []
          },
          // 限行区域
          rentalcar_xxqy: {
            field_value: null
          },
          // 手机
          rentalcar_sj: {
            field_value: null
          },
          // 联系人
          rentalcar_lxr: {
            field_value: null
          },
          // 其他联系
          rentalcar_qtlx: {
            field_value: null
          },
          // 取车地址
          rentalcar_qcdz: {
            field_value: null
          }
        },
        imgData: []
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
      // 单选变更
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
        if (this.imgData.length < 1) {
          this.$toasted.show('请您至少上传一张图片！')
          return false
        }
        if (!this.form.article_title) {
          this.$toasted.show('请输入标题！')
          return false
        }
        if (!this.fields.rentalcar_cx.field_value) {
          this.$toasted.show('请选择您的车型！')
          return false
        }
        if (!this.fields.rentalcar_rzj.field_value) {
          this.$toasted.show('请输入您的日租价！')
          return false
        }
        if (!this.fields.rentalcar_syfw.field_value) {
          this.$toasted.show('请选择您的使用范围！')
          return false
        }
        if (!this.fields.rentalcar_lxr.field_value) {
          this.$toasted.show('请输入您的联系人！')
          return false
        }
        if (!this.fields.rentalcar_sj.field_value) {
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
         background-color: #FF3B3B;
         color: #fff;
         margin: 10px;
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

  .vux-checker-box {

  }
</style>
