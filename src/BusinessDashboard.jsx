import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { ArrowLeft, Lightbulb, TrendingUp, MessageCircle, Star } from 'lucide-react';

// --- MOCK DATA ---
const COLORS = ['#FFD100', '#004B23', '#FF9900', '#4ADE80', '#3B82F6'];

const hourlyData = [
  { hour: '08:00', 'Food Tour': 40, 'Legacy Tour': 24, 'Mekong': 15 },
  { hour: '12:00', 'Food Tour': 60, 'Legacy Tour': 38, 'Mekong': 40 },
  { hour: '16:00', 'Food Tour': 85, 'Legacy Tour': 43, 'Mekong': 20 },
  { hour: '20:00', 'Food Tour': 95, 'Legacy Tour': 65, 'Mekong': 10 },
];

const scatterData = [
  { name: 'Food Tour', posts: 120, impact: 850 },
  { name: 'Legacy Tour', posts: 80, impact: 600 },
  { name: 'Mekong Delta', posts: 50, impact: 400 },
  { name: 'Breakfast Tour', posts: 30, impact: 250 },
  { name: 'Homecook', posts: 20, impact: 150 },
];

const marketShareData = [
  { name: 'Food & Culinary', value: 45 },
  { name: 'Culture & History', value: 30 },
  { name: 'Local Living', value: 15 },
  { name: 'Mekong Delta', value: 10 },
];

const sentimentData = [
  { name: 'Tích cực', value: 75 },
  { name: 'Trung lập', value: 15 },
  { name: 'Tiêu cực', value: 10 },
];

const commentsData = [
  { user: 'John Doe', text: 'Chuyến đi tuyệt vời, tôi rất thích đồ ăn!', time: '10 mins ago', link: '#', sentiment: 'Tích cực', isPotential: true, aiSuggest: 'Khách rất thích ẩm thực, hãy upsell lớp học nấu ăn Authentic Homecook.' },
  { user: 'Anna Smith', text: 'Trời hơi nóng nhưng HDV rất nhiệt tình.', time: '1 hour ago', link: '#', sentiment: 'Trung lập', isPotential: false, aiSuggest: 'Gửi email cảm ơn và tặng voucher cho tour buổi tối mát mẻ hơn.' },
  { user: 'Mike Ross', text: 'Gia đình tôi 5 người muốn tìm tour đi Mekong.', time: '2 hours ago', link: '#', sentiment: 'Tích cực', isPotential: true, aiSuggest: 'LEAD NÓNG! Khách gia đình, hãy liên hệ ngay tư vấn tour Mekong Private.' },
];

export default function BusinessDashboard({ onClose }) {
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  const [selectedTour, setSelectedTour] = useState('Food Tour');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* HEADER DASHBOARD */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border-b-4 border-[#FFD100] mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-[#FFD100] transition-colors">
            <ArrowLeft size={24} className="text-[#004B23]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#004B23] uppercase tracking-wide">Business Insight</h1>
            <p className="text-sm text-gray-500">Hệ thống phân tích dữ liệu Saigon Happy Tour</p>
          </div>
        </div>
        
        {/* SELECTOR THỜI GIAN */}
        <select 
          value={timeFilter} 
          onChange={(e) => setTimeFilter(e.target.value)}
          className="p-3 border-2 border-gray-200 rounded-xl font-bold text-[#004B23] focus:ring-2 focus:ring-[#FFD100] outline-none cursor-pointer bg-white"
        >
          <option value="1 day">1 Day</option>
          <option value="Last 7 days">Last 7 Days</option>
          <option value="Last 1 month">Last 1 Month</option>
          <option value="all time">All Time</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- PHẦN 1: TOUR PERFORMANCE OVERVIEW --- */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <TrendingUp className="text-[#FFD100]" size={28} />
            <h2 className="text-xl font-bold text-[#004B23]">1. Tour Performance Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scatter Plot */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-center font-semibold mb-4 text-gray-700">Độ lan tỏa các Tour (Size = Impact)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="posts" name="Số bài viết" type="number" />
                  <YAxis dataKey="impact" name="Impact Score" type="number" />
                  <ZAxis dataKey="impact" range={[100, 1000]} name="Impact" />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Tours" data={scatterData} fill="#004B23" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-center font-semibold mb-4 text-gray-700">Tour Impact Score theo giờ</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Food Tour" stroke="#FFD100" strokeWidth={3} />
                  <Line type="monotone" dataKey="Legacy Tour" stroke="#004B23" strokeWidth={3} />
                  <Line type="monotone" dataKey="Mekong" stroke="#FF9900" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Post & AI Insight */}
          <div className="mt-8 bg-[#004B23]/5 p-6 rounded-xl border border-[#004B23]/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#004B23] flex items-center gap-2"><Star className="text-[#FFD100]" /> Bài viết nổi bật nhất để học hỏi</h3>
              <select className="p-2 border rounded-lg outline-none bg-white" value={selectedTour} onChange={(e) => setSelectedTour(e.target.value)}>
                {scatterData.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#FFD100] mb-4">
              <p className="italic text-gray-600">"Chuyến đi {selectedTour} hôm nay quá tuyệt vời, anh HDV siêu nhiệt tình, đồ ăn ngon đỉnh cao! 10/10 sẽ quay lại..."</p>
            </div>
            <div className="flex gap-3 text-[#004B23] font-medium items-start">
              <Lightbulb className="shrink-0 text-[#FF9900]" />
              <p><strong>AI INSIGHT:</strong> Bài viết này thành công nhờ nhấn mạnh vào "Sự nhiệt tình của HDV" và hình ảnh món ăn trực quan. Hãy áp dụng content này cho các chiến dịch quảng cáo tiếp theo của {selectedTour}.</p>
            </div>
          </div>
        </section>

        {/* --- PHẦN 2 & 5: MARKET SHARE & SENTIMENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Market Share */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#004B23] mb-6 border-b pb-4">2. Market Share (Theo Tour Type)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                  {marketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </section>

          {/* Sentiment */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#004B23] mb-6 border-b pb-4">3. Phân tích Cảm xúc (Sentiment)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#004B23">
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Tích cực' ? '#4ADE80' : entry.name === 'Tiêu cực' ? '#EF4444' : '#FFD100'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* --- PHẦN BẢNG COMMENT REALTIME --- */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#004B23] p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#FFD100] flex items-center gap-2"><MessageCircle /> 4. Realtime Comments & AI Actions</h2>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm animate-pulse">Cập nhật lúc: Vừa xong</span>
          </div>
          
          <div className="overflow-x-auto p-2">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-gray-500">
                  <th className="p-4">User</th>
                  <th className="p-4 w-1/3">Comment text</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Sentiment</th>
                  <th className="p-4">💡 AI Gợi ý Hành động</th>
                </tr>
              </thead>
              <tbody>
                {commentsData.map((cmt, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-[#004B23]">{cmt.user}</td>
                    <td className="p-4 text-gray-700">{cmt.text}</td>
                    <td className="p-4 text-sm text-gray-400">{cmt.time}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${cmt.sentiment === 'Tích cực' ? 'bg-green-100 text-green-700' : cmt.sentiment === 'Tiêu cực' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                        {cmt.sentiment}
                      </span>
                    </td>
                    {/* HIGHLIGHT CHO KHÁCH TIỀM NĂNG */}
                    <td className={`p-4 font-medium border-l-4 ${cmt.isPotential ? 'bg-[#FFD100]/10 border-[#FFD100] text-[#004B23]' : 'border-transparent text-gray-500'}`}>
                      {cmt.isPotential && <span className="mr-2 animate-bounce inline-block text-red-500">🔥</span>}
                      {cmt.aiSuggest}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}