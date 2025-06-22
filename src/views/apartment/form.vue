<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑公寓' : '新增公寓' }}</span>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公寓名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入公寓名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公寓类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择公寓类型" style="width: 100%">
                <el-option label="普通公寓" value="normal" />
                <el-option label="豪华公寓" value="luxury" />
                <el-option label="商务公寓" value="business" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="active">正常</el-radio>
                <el-radio label="inactive">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼层数" prop="floors">
              <el-input-number v-model="form.floors" :min="1" :max="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间总数" prop="totalRooms">
              <el-input-number v-model="form.totalRooms" :min="1" :max="1000" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公寓描述" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                :rows="4"
                placeholder="请输入公寓描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            {{ isEdit ? '更新' : '创建' }}
          </el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'ApartmentForm',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const formRef = ref(null)
    const loading = ref(false)
    
    const form = reactive({
      name: '',
      type: '',
      address: '',
      phone: '',
      status: 'active',
      floors: 1,
      totalRooms: 1,
      description: ''
    })
    
    const rules = {
      name: [
        { required: true, message: '请输入公寓名称', trigger: 'blur' }
      ],
      type: [
        { required: true, message: '请选择公寓类型', trigger: 'change' }
      ],
      address: [
        { required: true, message: '请输入详细地址', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ]
    }
    
    const isEdit = computed(() => {
      return route.params.id !== undefined
    })
    
    const getApartment = (id) => {
      // 模拟获取公寓数据
      const mockData = {
        id: id,
        name: '阳光公寓',
        type: 'normal',
        address: '北京市朝阳区建国路88号',
        phone: '13800138000',
        status: 'active',
        floors: 12,
        totalRooms: 48,
        description: '这是一个环境优美的公寓，交通便利，配套设施齐全。'
      }
      
      Object.assign(form, mockData)
    }
    
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          
          // 模拟API调用
          setTimeout(() => {
            ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
            router.push('/apartment/list')
            loading.value = false
          }, 1000)
        }
      })
    }
    
    const handleCancel = () => {
      router.push('/apartment/list')
    }
    
    onMounted(() => {
      if (isEdit.value) {
        getApartment(route.params.id)
      }
    })
    
    return {
      formRef,
      form,
      rules,
      loading,
      isEdit,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style> 