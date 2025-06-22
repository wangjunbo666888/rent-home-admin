<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑房间' : '新增房间' }}</span>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属公寓" prop="apartmentId">
              <el-select v-model="form.apartmentId" placeholder="请选择所属公寓" style="width: 100%">
                <el-option
                  v-for="apartment in apartmentOptions"
                  :key="apartment.id"
                  :label="apartment.name"
                  :value="apartment.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间号" prop="roomNumber">
              <el-input v-model="form.roomNumber" placeholder="请输入房间号" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房间类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择房间类型" style="width: 100%">
                <el-option label="一室一厅" value="一室一厅" />
                <el-option label="两室一厅" value="两室一厅" />
                <el-option label="三室一厅" value="三室一厅" />
                <el-option label="四室一厅" value="四室一厅" />
                <el-option label="单间" value="单间" />
                <el-option label="开间" value="开间" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="vacant">空置</el-radio>
                <el-radio label="rented">已租</el-radio>
                <el-radio label="maintenance">维护中</el-radio>
                <el-radio label="reserved">已预订</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="面积" prop="area">
              <el-input-number 
                v-model="form.area" 
                :min="10" 
                :max="500" 
                :precision="1"
                style="width: 100%"
              />
              <span style="margin-left: 10px;">㎡</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月租金" prop="price">
              <el-input-number 
                v-model="form.price" 
                :min="0" 
                :max="50000" 
                :precision="0"
                style="width: 100%"
              />
              <span style="margin-left: 10px;">元/月</span>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼层" prop="floor">
              <el-input-number v-model="form.floor" :min="1" :max="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="朝向" prop="orientation">
              <el-select v-model="form.orientation" placeholder="请选择朝向" style="width: 100%">
                <el-option label="东" value="东" />
                <el-option label="南" value="南" />
                <el-option label="西" value="西" />
                <el-option label="北" value="北" />
                <el-option label="东南" value="东南" />
                <el-option label="西南" value="西南" />
                <el-option label="东北" value="东北" />
                <el-option label="西北" value="西北" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 租客信息 -->
        <el-divider content-position="left">租客信息</el-divider>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="租客姓名" prop="tenant">
              <el-input v-model="form.tenant" placeholder="请输入租客姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tenantPhone">
              <el-input v-model="form.tenantPhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="租期开始" prop="rentStartDate">
              <el-date-picker
                v-model="form.rentStartDate"
                type="date"
                placeholder="选择租期开始日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="租期结束" prop="rentEndDate">
              <el-date-picker
                v-model="form.rentEndDate"
                type="date"
                placeholder="选择租期结束日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="房间描述" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                :rows="4"
                placeholder="请输入房间描述"
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
  name: 'RoomForm',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const formRef = ref(null)
    const loading = ref(false)
    
    const form = reactive({
      apartmentId: '',
      roomNumber: '',
      type: '',
      status: 'vacant',
      area: 50,
      price: 3000,
      floor: 1,
      orientation: '',
      tenant: '',
      tenantPhone: '',
      rentStartDate: '',
      rentEndDate: '',
      description: ''
    })
    
    const rules = {
      apartmentId: [
        { required: true, message: '请选择所属公寓', trigger: 'change' }
      ],
      roomNumber: [
        { required: true, message: '请输入房间号', trigger: 'blur' }
      ],
      type: [
        { required: true, message: '请选择房间类型', trigger: 'change' }
      ],
      area: [
        { required: true, message: '请输入面积', trigger: 'blur' }
      ],
      price: [
        { required: true, message: '请输入月租金', trigger: 'blur' }
      ],
      tenantPhone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ]
    }
    
    const apartmentOptions = [
      { id: 1, name: '阳光公寓' },
      { id: 2, name: '翠湖公寓' },
      { id: 3, name: '海景花园' }
    ]
    
    const isEdit = computed(() => {
      return route.params.id !== undefined
    })
    
    const getRoom = (id) => {
      // 模拟获取房间数据
      const mockData = {
        id: id,
        apartmentId: 1,
        roomNumber: '101',
        type: '一室一厅',
        status: 'rented',
        area: 45,
        price: 3500,
        floor: 1,
        orientation: '南',
        tenant: '张三',
        tenantPhone: '13800138000',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-12-31',
        description: '这是一个采光良好的房间，配套设施齐全。'
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
            router.push('/room/list')
            loading.value = false
          }, 1000)
        }
      })
    }
    
    const handleCancel = () => {
      router.push('/room/list')
    }
    
    onMounted(() => {
      if (isEdit.value) {
        getRoom(route.params.id)
      }
    })
    
    return {
      formRef,
      form,
      rules,
      loading,
      isEdit,
      apartmentOptions,
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