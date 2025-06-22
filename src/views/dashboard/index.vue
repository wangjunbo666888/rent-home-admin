<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎使用房产中介管理系统</div>
    
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon apartment-icon">
              <el-icon><House /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.apartmentCount }}</div>
              <div class="stats-label">公寓总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon room-icon">
              <el-icon><OfficeBuilding /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.roomCount }}</div>
              <div class="stats-label">房间总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon available-icon">
              <el-icon><Check /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.availableCount }}</div>
              <div class="stats-label">可租房源</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon user-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.userCount }}</div>
              <div class="stats-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>公寓分布统计</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里可以添加图表组件 -->
            <div class="chart-placeholder">
              公寓分布图表
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>价格区间统计</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里可以添加图表组件 -->
            <div class="chart-placeholder">
              价格区间图表
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 最近活动 -->
    <el-row :gutter="20" class="activity-row">
      <el-col :span="12">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近添加的公寓</span>
            </div>
          </template>
          <div class="activity-list">
            <div v-for="apartment in recentApartments" :key="apartment.id" class="activity-item">
              <div class="activity-content">
                <div class="activity-title">{{ apartment.name }}</div>
                <div class="activity-desc">{{ apartment.address }}</div>
                <div class="activity-time">{{ apartment.createdAt }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>系统公告</span>
            </div>
          </template>
          <div class="notice-list">
            <div v-for="notice in notices" :key="notice.id" class="notice-item">
              <div class="notice-content">
                <div class="notice-title">{{ notice.title }}</div>
                <div class="notice-desc">{{ notice.content }}</div>
                <div class="notice-time">{{ notice.createdAt }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Dashboard',
  setup() {
    const stats = ref({
      apartmentCount: 0,
      roomCount: 0,
      availableCount: 0,
      userCount: 0
    })
    
    const recentApartments = ref([])
    const notices = ref([])
    
    const fetchStats = async () => {
      // 模拟数据
      stats.value = {
        apartmentCount: 156,
        roomCount: 892,
        availableCount: 234,
        userCount: 45
      }
    }
    
    const fetchRecentApartments = async () => {
      // 模拟数据
      recentApartments.value = [
        {
          id: 1,
          name: '阳光公寓A座',
          address: '朝阳区建国路88号',
          createdAt: '2024-01-15 10:30'
        },
        {
          id: 2,
          name: '海景花园B栋',
          address: '海淀区中关村大街1号',
          createdAt: '2024-01-14 15:20'
        },
        {
          id: 3,
          name: '城市之光C区',
          address: '西城区西单北大街120号',
          createdAt: '2024-01-13 09:15'
        }
      ]
    }
    
    const fetchNotices = async () => {
      // 模拟数据
      notices.value = [
        {
          id: 1,
          title: '系统维护通知',
          content: '系统将于今晚22:00-24:00进行维护升级',
          createdAt: '2024-01-15 14:00'
        },
        {
          id: 2,
          title: '新功能上线',
          content: '新增批量导入功能，提升工作效率',
          createdAt: '2024-01-14 16:30'
        },
        {
          id: 3,
          title: '数据备份提醒',
          content: '请及时备份重要数据，确保数据安全',
          createdAt: '2024-01-13 11:20'
        }
      ]
    }
    
    onMounted(() => {
      fetchStats()
      fetchRecentApartments()
      fetchNotices()
    })
    
    return {
      stats,
      recentApartments,
      notices
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  .dashboard-text {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .stats-row {
    margin-bottom: 30px;
    
    .stats-card {
      .stats-content {
        display: flex;
        align-items: center;
        
        .stats-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          font-size: 24px;
          color: white;
          
          &.apartment-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          &.room-icon {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          
          &.available-icon {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          
          &.user-icon {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          }
        }
        
        .stats-info {
          .stats-number {
            font-size: 28px;
            font-weight: bold;
            color: #303133;
            margin-bottom: 5px;
          }
          
          .stats-label {
            font-size: 14px;
            color: #909399;
          }
        }
      }
    }
  }
  
  .chart-row {
    margin-bottom: 30px;
    
    .chart-card {
      .card-header {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
      
      .chart-container {
        height: 300px;
        
        .chart-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f7fa;
          color: #909399;
          font-size: 16px;
          border-radius: 4px;
        }
      }
    }
  }
  
  .activity-row {
    .activity-card {
      .card-header {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
      
      .activity-list,
      .notice-list {
        .activity-item,
        .notice-item {
          padding: 15px 0;
          border-bottom: 1px solid #ebeef5;
          
          &:last-child {
            border-bottom: none;
          }
          
          .activity-content,
          .notice-content {
            .activity-title,
            .notice-title {
              font-size: 14px;
              font-weight: 500;
              color: #303133;
              margin-bottom: 5px;
            }
            
            .activity-desc,
            .notice-desc {
              font-size: 12px;
              color: #606266;
              margin-bottom: 5px;
            }
            
            .activity-time,
            .notice-time {
              font-size: 12px;
              color: #909399;
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
    
    .stats-row {
      .el-col {
        margin-bottom: 15px;
      }
    }
    
    .chart-row {
      .el-col {
        margin-bottom: 15px;
      }
    }
    
    .activity-row {
      .el-col {
        margin-bottom: 15px;
      }
    }
  }
}
</style> 