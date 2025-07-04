
import { Book, Users, Award, Heart } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header cartItems={0} />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Tentang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BookStore</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Menyediakan akses mudah ke dunia literatur untuk semua orang
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cerita Kami</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                BookStore lahir dari passion untuk menyebarkan pengetahuan dan kecintaan terhadap buku. 
                Didirikan pada tahun 2020, kami memulai perjalanan dengan visi sederhana: membuat buku 
                berkualitas dapat diakses oleh semua orang di Indonesia.
              </p>
              <p className="mb-6">
                Dengan koleksi yang terus berkembang dari berbagai genre dan penulis terbaik, 
                kami berkomitmen untuk menjadi partner terpercaya dalam perjalanan literasi Anda. 
                Dari fiksi yang menginspirasi hingga buku teknologi yang membantu karir, 
                setiap buku di BookStore dipilih dengan cermat.
              </p>
              <p>
                Hari ini, BookStore telah melayani ribuan pembaca di seluruh Indonesia 
                dan terus berinovasi untuk memberikan pengalaman berbelanja buku yang terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">BookStore dalam Angka</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">10,000+</div>
              <div className="text-gray-600">Koleksi Buku</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">25,000+</div>
              <div className="text-gray-600">Customer Puas</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">50+</div>
              <div className="text-gray-600">Penghargaan</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">99%</div>
              <div className="text-gray-600">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Misi Kami</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span>Menyediakan akses mudah ke buku berkualitas untuk semua kalangan</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span>Mendukung budaya literasi di Indonesia</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span>Memberikan pengalaman berbelanja yang memuaskan</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span>Membangun komunitas pembaca yang aktif</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Visi Kami</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Menjadi platform buku online terdepan di Indonesia yang menginspirasi 
                dan memberdayakan masyarakat melalui kekuatan literatur, dengan komitmen 
                pada kualitas, inovasi, dan pelayanan terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Tim BookStore</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AH</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Ahmad Hidayat</h4>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SR</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Siti Rahayu</h4>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">BP</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Budi Prasetyo</h4>
              <p className="text-gray-600">Head of Technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
