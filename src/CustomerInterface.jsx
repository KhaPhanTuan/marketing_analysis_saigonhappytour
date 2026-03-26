import React, { useState, useEffect, useRef } from 'react';
import { User, Map, Clock, Users, Utensils, Heart, MessageCircle, Send, X, Loader2, ChevronRight } from 'lucide-react';
import BusinessDashboard from './BusinessDashboard';
// === COMPONENT CON: IMAGE SLIDER (Để tái sử dụng cho Hero và Chat) ===
function ImageSlider({ images, overlayColor = 'bg-black/40', interval = 5000 }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === currentImg ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      {/* Lớp overlay màu trong suốt để làm nổi bật nội dung (text/chat) */}
      <div className="absolute inset-0 z-1" style={{ backgroundColor: 'inherit' }}>
          <div className={`absolute inset-0 ${overlayColor}`}></div>
      </div>
    </div>
  );
}

// === COMPONENT CHÍNH ===
export default function CustomerInterface() {
  const [viewState, setViewState] = useState('home'); // Giờ sẽ có: 'home', 'form', 'chat', 'login', 'dashboard'
  
  // Khi bấm nút Icon User, chuyển sang trạng thái login thay vì dashboard
  const handleLoginClick = () => {
    setViewState('login');
  };

  // Nếu đăng nhập thành công thì mới cho vào Dashboard
  if (viewState === 'dashboard') {
    return <BusinessDashboard onClose={() => setViewState('home')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col relative overflow-hidden">
      {/* HEADER TỐI GIẢN */}
      <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="text-[#FFD100] text-2xl font-black tracking-widest uppercase drop-shadow-md">
          Saigon Happy Tour
        </div>
        <button 
          onClick={handleLoginClick}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-[#FFD100] hover:text-[#004B23] transition-all"
          title="Đăng nhập dành cho đối tác/nhân viên"
        >
          <User size={24} />
        </button>
      </header>

      {/* RENDER NỘI DUNG DỰA TRÊN TRẠNG THÁI */}
      {viewState === 'home' && <HeroSection onStart={() => setViewState('form')} />}
      {viewState === 'form' && <PreferenceForm onSubmit={() => setViewState('chat')} onClose={() => setViewState('home')} />}
      {viewState === 'chat' && <ChatbotInterface onClose={() => setViewState('home')} />}
      
      {/* HIỂN THỊ FORM LOGIN KHI VIEWSTATE LÀ LOGIN */}
      {viewState === 'login' && (
        <BusinessLogin 
          onLoginSuccess={() => setViewState('dashboard')} 
          onClose={() => setViewState('home')} 
        />
      )}
    </div>
  );
}

// === COMPONENT 1: HERO SECTION (Slider ảnh + Nút lắc) ===
function HeroSection({ onStart }) {
  // 📸 BỔ SUNG THÊM HÌNH ẢNH TẠI ĐÂY: Bạn cứ thêm URL ảnh thật của bạn vào mảng này nhé!
  const heroImages = [
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1920&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGglRTElQkIlOUZ8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1920&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGIlQzMlQTFuaCUyMG0lQzMlQUN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1575256297426-b5ae350fd924?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    "https://images.unsplash.com/photo-1575256297426-b5ae350fd924?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    "https://plus.unsplash.com/premium_photo-1697729938237-680e72596e15?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1920&auto=format&fit=crop",
  ];

  // Logic nút lắc thỉnh thoảng
  const [shouldShake, setShouldShake] = useState(false);
  useEffect(() => {
    // Tạo chuỗi: Lắc trong 0.6s -> Dừng trong 5s -> Lắc lại
    const shakeSequence = () => {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 600); // Lắc trong 0.6s (khớp với thời gian animation CSS)
    };

    // Thiết lập interval để lặp lại chuỗi trên sau mỗi 5.6 giây (5s dừng + 0.6s lắc)
    const shakeInterval = setInterval(shakeSequence, 5600);

    return () => clearInterval(shakeInterval); // Cleanup
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      {/* Dùng Component ImageSlider với overlay tối (bg-black/40) để nổi chữ */}
      <ImageSlider images={heroImages} overlayColor="bg-black/40" interval={5000} />

      {/* Nội dung chính ở giữa */}
      <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          Khám phá Sài Gòn <br /> <span className="text-[#FFD100]">Theo Cách Của Bạn</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md">
          Không cần tìm kiếm đâu xa. AI của chúng tôi sẽ thiết kế một hành trình độc bản chỉ trong 30 giây.
        </p>
        {/* Class được thêm điều kiện: animate-shake */}
        <button 
          onClick={onStart}
          className={`bg-[#FFD100] text-[#004B23] px-10 py-5 rounded-full text-xl font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,209,0,0.5)] transition-all duration-300 relative z-20 ${shouldShake ? 'animate-shake' : ''}`}
        >
          Tìm Tour Phù Hợp Nhất 
        </button>
      </div>
    </div>
  );
}

// === COMPONENT 2: FORM ĐIỀN THÔNG TIN (Giữ nguyên) ===
function PreferenceForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => { e.preventDefault(); console.log("Gửi n8n:", formData); onSubmit(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white bg-white/20 hover:bg-white hover:text-red-500 rounded-full z-10"> <X size={20} /> </button>
        <div className="bg-[#004B23] p-8 text-center shrink-0">
          <h2 className="text-3xl font-bold text-[#FFD100] mb-2">Thông tin chuyến đi</h2>
          <p className="text-gray-200 text-sm">Hãy cho chúng tôi biết sở thích của bạn để thiết kế trải nghiệm tốt nhất.</p>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar bg-gray-50 flex-1">
          <form id="tourForm" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <Heart size={20} className="text-[#FFD100]" /> 1. Trải nghiệm gì nhất? </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {['Thưởng thức ẩm thực', 'Khám phá văn hóa & Lịch sử', 'Trải nghiệm cuộc sống địa phương', 'Thiên nhiên & Miền Tây', 'Điểm đến ít người biết'].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-[#FFD100]"> <input type="radio" name="preference" value={opt} onChange={(e) => setFormData({...formData, pref: e.target.value})} className="text-[#004B23] focus:ring-[#FFD100] w-5 h-5" required /> <span className="text-gray-700 font-medium">{opt}</span> </label>
                ))} </div>
            </div>
            <div className="space-y-3"> <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <Utensils size={20} className="text-[#FFD100]" /> 2. Chế độ ăn uống? </label> <select onChange={(e) => setFormData({...formData, diet: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#FFD100] outline-none font-medium" required> <option value="">-- Chọn --</option> <option value="normal">Ăn uống bình thường</option> <option value="vegan">Ăn chay</option> <option value="noseafood">Không ăn được hải sản</option> <option value="other">Khác</option> </select> </div>
            <div className="space-y-3"> <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <Map size={20} className="text-[#FFD100]" /> 3. Phương tiện di chuyển? </label> <div className="grid grid-cols-3 gap-3"> {['Xe máy', 'Ô tô', 'Đi bộ/Thuyền'].map(method => (
                  <label key={method} className={`border p-4 rounded-xl text-center cursor-pointer font-medium transition-all ${formData.transport === method ? 'bg-[#FFD100] border-[#FFD100] text-[#004B23] shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}> <input type="radio" name="transport" value={method} onChange={(e) => setFormData({...formData, transport: e.target.value})} className="hidden" required /> {method} </label>
                ))} </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3"> <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <Clock size={20} className="text-[#FFD100]" /> 4. Thời gian? </label> <select onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#FFD100] outline-none font-medium" required> <option value="">-- Chọn --</option> <option value="morning">Buổi sáng</option> <option value="evening">Buổi chiều/tối</option> <option value="fullday">Cả ngày</option> <option value="multiday">Dài ngày</option> </select> </div>
              <div className="space-y-3"> <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <Users size={20} className="text-[#FFD100]" /> 5. Số lượng người? </label> <input type="number" min="1" placeholder="Nhập số người" onChange={(e) => setFormData({...formData, size: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#FFD100] outline-none font-medium" required /> </div>
            </div>
            <div className="space-y-3"> <label className="font-bold text-[#004B23] flex items-center gap-2 text-lg border-b pb-2"> <MessageCircle size={20} className="text-[#FFD100]" /> 6. Ghi chú thêm </label> <textarea placeholder="Ví dụ: Dị ứng đậu phộng,..." onChange={(e) => setFormData({...formData, note: e.target.value})} rows="3" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#FFD100] outline-none"></textarea> </div>
          </form>
        </div>
        <div className="p-4 bg-white border-t shrink-0">
          <button form="tourForm" type="submit" className="w-full bg-[#004B23] text-[#FFD100] font-bold text-xl py-4 rounded-xl hover:bg-opacity-90 shadow-lg flex justify-center items-center gap-2"> Tìm Hành Trình Của Tôi <ChevronRight size={24} /> </button>
        </div>
      </div>
    </div>
  );
}

// === COMPONENT 3: GIAO DIỆN CHATBOT (Bổ sung nền ảnh) ===
function ChatbotInterface({ onClose }) {
  // Dùng lại ảnh ở trang đầu hoặc thêm ảnh mới tùy bạn nhé!
  const chatBackgroundImages = [
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621216668383-05701830602f?q=80&w=1920&auto=format&fit=crop"
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ sender: 'ai', text: 'Tuyệt vời! Dựa trên thông tin bạn cung cấp, đây là tour hoàn hảo nhất dành cho bạn:\n\n**ZERO TOURIST FOOD TOUR BY SCOOTER**\n- Khám phá 6 quận xa trung tâm.\n- Thưởng thức 7-8 món ăn bản địa.\n- Phương tiện: Xe máy cùng tài xế chuyên nghiệp.\n\nBạn có muốn biết thêm chi tiết về giá hay lịch trình cụ thể không?' }]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e) => {
    e.preventDefault(); if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput(''); setIsTyping(true);
    setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, { sender: 'ai', text: 'Tour này có giá là $50/người bao gồm mọi chi phí ăn uống và di chuyển. Điểm nhấn là bạn sẽ không thấy khách du lịch nào khác, một trải nghiệm thuần Sài Gòn 100%! Mình tiến hành đặt lịch cho bạn nhé?' }]); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 p-0 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white md:rounded-2xl shadow-2xl w-full h-full md:max-w-4xl md:h-[85vh] flex flex-col overflow-hidden border border-gray-200">
        
        {/* Header Chat (Giữ nguyên) */}
        <div className="bg-[#004B23] p-4 flex justify-between items-center shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD100] flex items-center justify-center text-[#004B23] font-bold"> AI </div>
            <div>
              <h3 className="text-[#FFD100] font-bold text-lg">Trợ Lý Trực Tuyến</h3>
              <p className="text-gray-300 text-xs flex items-center gap-1"> <span className="w-2 h-2 rounded-full bg-green-400"></span> Trực tuyến </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors"> <X size={24} /> </button>
        </div>

        {/* --- NỘI DUNG CHAT (Nền ảnh chạy + Tin nhắn) --- */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 relative">
          
          {/* 🌟 THAY ĐỔI TẠI ĐÂY: Áp dụng Slider ảnh làm nền */}
          {/* overlayColor: bg-white/60 giúp nền sáng hơn một chút so với trang Hero để tin nhắn chat dễ đọc */}
          <div className="absolute inset-0 z-0">
             <ImageSlider images={chatBackgroundImages} overlayColor="bg-white/60" interval={5000} />
          </div>

          {/* Nội dung tin nhắn: Phải đặt z-10 để nổi lên trên nền ảnh */}
          <div className="relative z-10 flex-1 flex flex-col gap-4">
              {messages.length === 0 && isTyping && (
                 <div className="flex flex-col items-center justify-center h-full text-gray-700 space-y-4">
                   <Loader2 size={40} className="animate-spin text-[#004B23]" />
                   <p className="text-lg font-medium animate-pulse">Đang quét dữ liệu lịch trình phù hợp...</p>
                 </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed whitespace-pre-line shadow-md ${msg.sender === 'user' ? 'bg-[#FFD100] text-[#004B23] rounded-br-none self-end font-medium' : 'bg-white/90 border border-gray-100 text-gray-800 rounded-bl-none self-start backdrop-blur-sm'}`}>
                  {msg.text}
                </div>
              ))}

              {isTyping && messages.length > 0 && (
                 <div className="bg-white/90 border border-gray-100 rounded-2xl rounded-bl-none self-start p-4 flex gap-1 shadow-md w-16 backdrop-blur-sm">
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                 </div>
              )}
              <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Khung nhập text (Giữ nguyên) */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 shrink-0 z-10">
          <div className="relative flex items-center">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hỏi thêm về hành trình, giá cả, thời gian..." className="w-full bg-gray-100 text-gray-800 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-[#004B23]" />
            <button type="submit" disabled={!input.trim()} className="absolute right-2 p-2 bg-[#004B23] text-[#FFD100] rounded-full disabled:opacity-50 hover:bg-opacity-90"> <Send size={20} className="-ml-0.5 mt-0.5" /> </button>
          </div>
        </form>
      </div>
    </div>
  );
}
  // === COMPONENT 4: FORM ĐĂNG NHẬP DOANH NGHIỆP ===
function BusinessLogin({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả lập kiểm tra tài khoản (Có thể thay bằng API thật sau này)
    if (username === 'admin' && password === '123456') {
      onLoginSuccess();
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu. Gợi ý: admin / 123456');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        
        {/* Nút tắt */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white bg-white/20 hover:bg-white hover:text-red-500 rounded-full z-10 transition-colors">
          <X size={20} />
        </button>

        {/* Header Đăng nhập */}
        <div className="bg-[#004B23] p-8 text-center shrink-0">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#FFD100] rounded-full flex items-center justify-center text-[#004B23] shadow-lg">
              <User size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#FFD100] mb-2 uppercase tracking-wide">Cổng Quản Trị</h2>
          <p className="text-gray-200 text-sm">Dành riêng cho nhân viên Saigon Happy Tour</p>
        </div>

        {/* Form điền thông tin */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center animate-shake">
              {error}
            </div>
          )}
          
          <div>
            <label className="block font-bold text-[#004B23] mb-2">Tên đăng nhập</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFD100] outline-none bg-gray-50 font-medium" 
              placeholder="Nhập tên đăng nhập..." 
              required 
            />
          </div>
          
          <div>
            <label className="block font-bold text-[#004B23] mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFD100] outline-none bg-gray-50 font-medium" 
              placeholder="Nhập mật khẩu..." 
              required 
            />
          </div>
          
          <button type="submit" className="w-full bg-[#004B23] text-[#FFD100] font-bold text-xl py-4 rounded-xl hover:bg-opacity-90 shadow-lg transition-all hover:scale-[1.02]">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}