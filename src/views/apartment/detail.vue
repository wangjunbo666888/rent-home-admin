<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>公寓详情</span>
          <el-button type="primary" @click="handleEdit">编辑</el-button>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="公寓名称">
          {{ apartment.name }}
        </el-descriptions-item>
        <el-descriptions-item label="公寓类型">
          {{ getTypeLabel(apartment.type) }}
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          {{ apartment.address }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ apartment.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="apartment.status === 'active' ? 'success' : 'danger'">
            {{ apartment.status === 'active' ? '正常' : '停用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="楼层数">
          {{ apartment.floors }} 层
        </el-descriptions-item>
        <el-descriptions-item label="房间总数">
          {{ apartment.totalRooms }} 间
        </el-descriptions-item>
        <el-descriptions-item label="已租房间">
          {{ apartment.rentedRooms }} 间
        </el-descriptions-item>
        <el-descriptions-item label="空置房间">
          {{ apartment.vacantRooms }} 间
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ apartment.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ apartment.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="公寓描述" :span="2">
          {{ apartment.description }}
        </el-descriptions-item>
      </el-descriptions>
      
      <!-- 房间列表 -->
      <div class="room-section">
        <h3>房间列表</h3>
        <el-table :data="rooms" border style="width: 100%">
          <el-table-column prop="roomNumber" label="房间号" width="120" />
          <el-table-column prop="type" label="房间类型" width="120" />
          <el-table-column prop="area" label="面积" width="100">
            <template #default="scope">
              {{ scope.row.area }}㎡
            </template>
          </el-table-column>
          <el-table-column prop="price" label="租金" width="120">
            <template #default="scope">
              ¥{{ scope.row.price }}/月
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getRoomStatusType(scope.row.status)">
                {{ getRoomStatusLabel(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="tenant" label="租客" width="120" />
          <el-table-column prop="rentStartDate" label="租期开始" width="120" />
          <el-table-column prop="rentEndDate" label="租期结束" width="120" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'ApartmentDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const apartment = reactive({
      id: '',
      name: '',
      type: '',
      address: '',
      phone: '',
      status: '',
      floors: 0,
      totalRooms: 0,
      rentedRooms: 0,
      vacantRooms: 0,
      description: '',
      createTime: '',
      updateTime: ''
    })
    
    const rooms = ref([])
    
    const getTypeLabel = (type) => {
      const typeMap = {
        normal: '普通公寓',
        luxury: '豪华公寓',
        business: '商务公寓'
      }
      return typeMap[type] || type
    }
    
    const getRoomStatusType = (status) => {
      const statusMap = {
        vacant: 'info',
        rented: 'success',
        maintenance: 'warning',
        reserved: 'primary'
      }
      return statusMap[status] || 'info'
    }
    
    const getRoomStatusLabel = (status) => {
      const statusMap = {
        vacant: '空置',
        rented: '已租',
        maintenance: '维护中',
        reserved: '已预订'
      }
      return statusMap[status] || status
    }
    
    const getApartmentDetail = (id) => {
      // 模拟获取公寓详情数据
      const mockApartment = {
        id: id,
        name: '阳光公寓',
        type: 'normal',
        address: '北京市朝阳区建国路88号',
        phone: '13800138000',
        status: 'active',
        floors: 12,
        totalRooms: 48,
        rentedRooms: 35,
        vacantRooms: 13,
        description: '这是一个环境优美的公寓，交通便利，配套设施齐全。公寓位于市中心，周边有地铁站、商场、医院等配套设施，生活便利。',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-01-20 14:20:00'
      }
      
      Object.assign(apartment, mockApartment)
    }
    
    const getRooms = () => {
      // 模拟获取房间列表数据
      const mockRooms = [
        {
          id: 1,
          roomNumber: '101',
          type: '一室一厅',
          area: 45,
          price: 3500,
          status: 'rented',
          tenant: '张三',
          rentStartDate: '2024-01-01',
          rentEndDate: '2024-12-31'
        },
        {
          id: 2,
          roomNumber: '102',
          type: '两室一厅',
          area: 65,
          price: 4800,
          status: 'vacant',
          tenant: '',
          rentStartDate: '',
          rentEndDate: ''
        },
        {
          id: 3,
          roomNumber: '103',
          type: '一室一厅',
          area: 45,
          price: 3500,
          status: 'rented',
          tenant: '李四',
          rentStartDate: '2024-01-15',
          rentEndDate: '2024-12-31'
        }
      ]
      
      rooms.value = mockRooms
    }
    
    const handleEdit = () => {
      router.push(`/apartment/edit/${route.params.id}`)
    }
    
    onMounted(() => {
      const id = route.params.id
      getApartmentDetail(id)
      getRooms()
    })
    
    return {
      apartment,
      rooms,
      getTypeLabel,
      getRoomStatusType,
      getRoomStatusLabel,
      handleEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-section {
  margin-top: 30px;
  
  h3 {
    margin-bottom: 20px;
    color: #303133;
  }
}
</style> 