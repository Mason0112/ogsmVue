import axios from "axios";

// 建立 axios 實例
const axiosapi = axios.create({
  
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000 // 可選：設定 timeout 等等
})


axiosapi.interceptors.request.use(
  config => {
    
    // 自動附上 token（如果有）
    // config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => Promise.reject(error)
)

// 匯出實例
export default axiosapi