
<script setup>
import axios from "axios"
import { onBeforeMount, ref, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CirclePlus, EditPen } from '@element-plus/icons-vue'
const newObj = `{
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
}`

// 服务地址
const serviceUrl = [
  { label: 'http://172.17.17.81:10205/v2/api-docs', value: '/api/v2/api-docs' },
  { label: '本地内容', value: 1 },
]

// 文件格式
const fileFormat = [
  { label: 'text', value: '.text' },
  { label: 'json', value: '.json' },
]

// 表单ref
const ruleFormRef = ref()

// 表单数组
const ruleFormRefArr = ref([
  {
    fileForm: {
      name: '',
      fileFormat: '',
      serviceUrl: '',
      fileUrl: '',
    },
    rules: {
      name: [
        { required: true, message: '请输出文件名称', trigger: 'blur' },
      ],
      fileFormat: [
        { required: true, message: '请选择文件格式', trigger: 'change' },
      ],
      serviceUrl: [
        { required: true, message: '请选择服务地址', trigger: 'change' },
      ],
      fileUrl: [
        { required: true, message: '请选择文件路径', trigger: 'blur' },
      ],
    },
    isFile: false,
    isDetail: false,
    updateTime: ''
  }
])

const handleSave = () => {
  localStorage.setItem('ruleFormRefArr', JSON.stringify(ruleFormRefArr.value))
}

// 路径选择
const handleFocus = async (index) => {
  ruleFormRefArr.value[index].fileForm.fileUrl = await myApi.handleUpdate()
}

// 更新文件
const onSubmit = async (index) => {
  const fileForm = JSON.parse(JSON.stringify(ruleFormRefArr.value[index].fileForm))
  const isfileForm = Object.values(fileForm).every(item => item)
  if (!isfileForm) return ElMessage.error('请完整填写更新信息！')
  const filePath = `${fileForm.fileUrl}/${fileForm.name}${fileForm.fileFormat}`
  try {
    const oldValue = await myApi.readFile(filePath)
    writeFile(filePath, oldValue, index)
  } catch (err) {
    fileDialog(err, index)
  }

}

// 将内容写入文件
const writeFile = (filePath, oldValue, index) => {
  const fileForm = ruleFormRefArr.value[index].fileForm
  if (fileForm.serviceUrl === 1) {
    myApi.updateFile(filePath, newObj).then(res => {
      ruleFormRefArr.value[index].updateTime = res.time
      myApi.dialogMessage({ oldValue, newValue: newObj }, filePath)
    })
  } else {
    axios.get(fileForm.serviceUrl).then(res => {
      let newValue = JSON.stringify(res.data)
      myApi.updateFile(filePath, newValue).then(res => {
        ruleFormRefArr.value[index].updateTime = res.time
        myApi.dialogMessage({ oldValue, newValue }, filePath)

        // const file2Content =fs.readFileSync(filePath, 'utf-8');

      })
    })
  }

}


// 新建文件并 写入内容
const fileDialog = (err, index) => {
  const fileForm = ruleFormRefArr.value[index].fileForm
  const content = `当前选择目录中没有${fileForm.name}文件，需要新建${fileForm.name}${fileForm.fileFormat}文件么？`
  const title = '更新提示'
  const btn = {
    confirmButtonText: '新建',
    cancelButtonText: '取消',
    type: 'warning',
  }
  if (err === '当前目录中没有该文件') {
    ElMessageBox.confirm(content, title, btn).then(() => {
      const filePath = `${fileForm.fileUrl}/${fileForm.name}${fileForm.fileFormat}`
      writeFile(filePath, '', index)
    }).catch(() => {
      return
    })
  } else {
    return ElMessage.error(err)
  }

}

// 删除表单
const handleDelete = (index) => {
  ruleFormRefArr.value.splice(index, 1)
}

// 新增
const handleAdd = () => {
  ruleFormRefArr.value.push({
    ...ruleFormRefArr.value[0],
    updateTime: '',
    fileForm: {
      name: '',
      fileFormat: '',
      serviceUrl: '',
      fileUrl: '',
    },
  })
}

// 更新详情
const updateDetail = (index) => {
  ruleFormRefArr.value[index].isDetail = true
}

// 文件名称
const handlefileName = (index) => {
  ruleFormRefArr.value[index].isFile = true
}
const fileBlur = (index) => {
  ruleFormRefArr.value[index].isFile = false
}

onBeforeMount(() => {
  const storage = localStorage.getItem('ruleFormRefArr')
  if (storage) ruleFormRefArr.value = JSON.parse(storage)
})

onBeforeUnmount(() => {
  localStorage.setItem('ruleFormRefArr', JSON.stringify(ruleFormRefArr.value))
})
</script>

<template>
  <div class="main_body">
    <div class="add_box">
      <el-button type="primary" :icon="CirclePlus" @click="handleAdd">新增</el-button>
      <el-button type="primary" :icon="CirclePlus" @click="handleSave">本地村粗</el-button>
    </div>
    <div class="flex_box">
      <div class="update_box" :key="index" v-for="(item, index) in ruleFormRefArr">
        <div class="update_btn">
          <el-button type="primary" size="small" @click="onSubmit(index)">更新</el-button>
          <el-button type="primary" size="small" @click="updateDetail(index)">更新详情</el-button>
          <span class="updateTime_box" v-if="item.updateTime">最近更新：{{item.updateTime}}</span>
          <!-- <el-button type="danger" @click="handleDelete(index)">删除</el-button> -->
        </div>

        <el-carousel indicator-position="outside" :autoplay="false">
          <el-carousel-item>
            <el-form :model="item.fileForm" ref="ruleFormRef" label-width="100px" :rules="item.rules">
              <el-form-item label="文件名：" prop="name">
                <!-- 展示文件名 -->
                <el-tooltip class="box-item" effect="dark" v-if="item.fileForm.name && !item.isFile" :content="item.fileForm.name" placement="bottom-start">
                  <span class="span_box span_hidden" @click="handlefileName(index)">{{
                            item.fileForm.name }}</span>
                </el-tooltip>
                <!-- 提示输入文件名 -->
                <span class="span_box" v-else-if="!item.fileForm.name && !item.isFile" @click="handlefileName(index)">文件名称
                  <EditPen style="width: 10px;height: 10px;" />
                </span>
                <!-- 输入框 -->
                <el-input v-else-if="item.isFile" class="input_width" v-model="item.fileForm.name" placeholder="请输出文件名称" @blur="fileBlur(index)" />
              </el-form-item>
              <el-form-item label="文件格式：" prop="fileFormat">
                <el-select v-model="item.fileForm.fileFormat" placeholder="请选择文件格式">
                  <el-option :label="item.label" :value="item.value" v-for="item in fileFormat" :key="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="服务地址：" prop="serviceUrl">
                <el-select v-model="item.fileForm.serviceUrl" placeholder="请选择服务地址">
                  <el-option :label="item.label" :value="item.value" v-for="item in serviceUrl" :key="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="文件路径：" prop="fileUrl">
                <!-- 文件路径展示  -->
                <el-tooltip class="box-item" effect="dark" v-if="item.fileForm.fileUrl" :content="item.fileForm.fileUrl" placement="bottom-start">
                  <span class="span_box span_hidden" @click="handleFocus(index)">{{
                            item.fileForm.fileUrl }}</span>
                </el-tooltip>
                <!-- 选择文件路径 -->
                <span class="span_box" v-else @click="handleFocus(index)">文件路径
                  <EditPen style="width: 10px;height: 10px;" />
                </span>
              </el-form-item>

            </el-form>
          </el-carousel-item>
          <el-carousel-item>
            <div class="detail_box">123</div>

          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>

  <!-- <div @click="handleRead">读取文件</div> -->
</template>

<style lang="less" scoped>
/deep/.el-carousel__arrow {
  display: none !important;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.main_body {
  width: 100%;
  height: 100%;
  // padding: 40px;

  .add_box {
    width: 100%;
    height: 70px;
    background: rgb(192, 191, 191);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .flex_box {
    display: flex;
    flex-wrap: wrap;
    .update_box {
      width: 22%;
      height: 300px;
      background: #fff;
      overflow: hidden;
      overflow-y: auto;
      border: 1px solid rgb(185, 184, 184);
      border-radius: 10px;
      margin-left: 4%;
      margin-top: 20px;
      position: relative;

      &:first-child {
        margin-left: 0;
      }

      &:nth-child(4n + 1) {
        margin-left: 0;
      }

      &:nth-child(-n + 4) {
        margin-top: 0;
      }

      .update_btn {
        height: 40px;
        display: flex;
        border-bottom: 1px solid #b9b8b8;
        align-items: center;
        padding: 0 20px;

        .updateTime_box {
          font-size: 14px;
          color: black;
        }
      }

      .input_width {
        width: 214px;
      }

      .span_box {
        width: 80%;
        cursor: pointer;
      }

      .span_hidden {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/deep/.el-form-item {
  margin-bottom: 0;
}

/deep/.el-input__wrapper {
  border: none !important;
  border-radius: 0% !important;
  border-bottom: 1px solid red !important;
  box-shadow: none !important;
  padding: 0px; //前边边距去掉
}
</style>