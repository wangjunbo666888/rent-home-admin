<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>房间详情</span>
          <el-button type="primary" @click="handleEdit">编辑</el-button>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="房间号">
          {{ room.roomNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="所属公寓">
          {{ room.apartmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="房间类型">
          {{ room.type }}
        </el-descriptions-item>
        <el-descriptions-item label="房间状态">
          <el-tag :type="getStatusType(room.status)">
            {{ getStatusLabel(room.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="面积">
          {{ room.area }}㎡
        </el-descriptions-item>
        <el-descriptions-item label="月租金">
          ¥{{ room.price }}/月
        </el-descriptions-item>
        <el-descriptions-item label="楼层">
          {{ room.floor }}层
        </el-descriptions-item>
        <el-descriptions-item label="朝向">
          {{ room.orientation }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ room.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ room.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="房间描述" :span="2">
          {{ room.description }}
        </el-descriptions-item>
      </el-descriptions>
      
      <!-- 租客信息 -->
      <div class="tenant-section" v-if="room.status === 'rented'">
        <h3>租客信息</h3>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="租客姓名">
            {{ room.tenant }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ room.tenantPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="租期开始">
            {{ room.rentStartDate }}
          </el-descriptions-item>
          <el-descriptions-item label="租期结束">
            {{ room.rentEndDate }}
          </el-descriptions-item>
          <el-descriptions-item label="剩余租期">
            {{ getRemainingDays() }}天
          </el-descriptions-item>
          <el-descriptions-item label="租金状态">
            <el-tag type="success">已付</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      
      <!-- 房间设施 -->
      <div class="facility-section">
        <h3>房间设施</h3>
        <el-row :gutter="20">
          <el-col :span="8" v-for="facility in facilities" :key="facility.id">
            <el-card class="facility-card">
              <div class="facility-item">
                <el-icon class="facility-icon">
                  <component :is="facility.icon" />
                </el-icon>
                <span class="facility-name">{{ facility.name }}</span>
                <el-tag 
                  :type="facility.available ? 'success' : 'danger'" 
                  size="small"
                >
                  {{ facility.available ? '可用' : '不可用' }}
                </el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      
      <!-- 维护记录 -->
      <div class="maintenance-section">
        <h3>维护记录</h3>
        <el-timeline>
          <el-timeline-item
            v-for="record in maintenanceRecords"
            :key="record.id"
            :timestamp="record.date"
            :type="record.type"
          >
            <h4>{{ record.title }}</h4>
            <p>{{ record.description }}</p>
            <p class="maintenance-operator">操作人: {{ record.operator }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  House, 
  OfficeBuilding, 
  Check, 
  User,
  Connection,
  Monitor,
  Refrigerator,
  Tools,
  WindPower,
  VideoCamera
} from '@element-plus/icons-vue'

export default {
  name: 'RoomDetail',
  components: {
    House,
    OfficeBuilding,
    Check,
    User,
    Connection,
    Monitor,
    Refrigerator,
    Tools,
    WindPower,
    VideoCamera
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const room = reactive({
      id: '',
      roomNumber: '',
      apartmentId: '',
      apartmentName: '',
      type: '',
      status: '',
      area: 0,
      price: 0,
      floor: 0,
      orientation: '',
      tenant: '',
      tenantPhone: '',
      rentStartDate: '',
      rentEndDate: '',
      description: '',
      createTime: '',
      updateTime: ''
    })
    
    const facilities = ref([
      { id: 1, name: 'WiFi', icon: 'Connection', available: true },
      { id: 2, name: '空调', icon: 'WindPower', available: true },
      { id: 3, name: '电视', icon: 'VideoCamera', available: true },
      { id: 4, name: '冰箱', icon: 'Refrigerator', available: true },
      { id: 5, name: '洗衣机', icon: 'Tools', available: false },
      { id: 6, name: '电脑桌', icon: 'Monitor', available: true }
    ])
    
    const maintenanceRecords = ref([
      {
        id: 1,
        date: '2024-01-15',
        type: 'primary',
        title: '空调维修',
        description: '空调制冷效果不佳，已更换滤网并加氟',
        operator: '张师傅'
      },
      {
        id: 2,
        date: '2024-01-10',
        type: 'success',
        title: '定期检查',
        description: '例行检查房间设施，一切正常',
        operator: '李师傅'
      },
      {
        id: 3,
        date: '2024-01-05',
        type: 'warning',
        title: '水管维修',
        description: '厨房水管漏水，已修复',
        operator: '王师傅'
      }
    ])
    
    const getStatusType = (status) => {
      const statusMap = {
        vacant: 'info',
        rented: 'success',
        maintenance: 'warning',
        reserved: 'primary'
      }
      return statusMap[status] || 'info'
    }
    
    const getStatusLabel = (status) => {
      const statusMap = {
        vacant: '空置',
        rented: '已租',
        maintenance: '维护中',
        reserved: '已预订'
      }
      return statusMap[status] || status
    }
    
    const getRemainingDays = () => {
      if (!room.rentEndDate) return 0
      const endDate = new Date(room.rentEndDate)
      const today = new Date()
      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
    
    const getRoomDetail = (id) => {
      // 模拟获取房间详情数据
      const mockData = {
        id: id,
        roomNumber: '101',
        apartmentId: 1,
        apartmentName: '阳光公寓',
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
        description: '这是一个采光良好的房间，配套设施齐全。房间位于1楼，朝南，采光充足，适合居住。',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-01-20 14:20:00'
      }
      
      Object.assign(room, mockData)
    }
    
    const handleEdit = () => {
      router.push(`/room/edit/${route.params.id}`)
    }
    
    onMounted(() => {
      const id = route.params.id
      getRoomDetail(id)
    })
    
    return {
      room,
      facilities,
      maintenanceRecords,
      getStatusType,
      getStatusLabel,
      getRemainingDays,
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

.tenant-section,
.facility-section,
.maintenance-section {
  margin-top: 30px;
  
  h3 {
    margin-bottom: 20px;
    color: #303133;
  }
}

.facility-card {
  margin-bottom: 15px;
  
  .facility-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .facility-icon {
      font-size: 20px;
      color: #409EFF;
      margin-right: 10px;
    }
    
    .facility-name {
      flex: 1;
      margin-right: 10px;
    }
  }
}

.maintenance-operator {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
}
</style> 