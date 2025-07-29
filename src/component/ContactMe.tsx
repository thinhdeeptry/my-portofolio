"use client"
import type React from "react"
import { useState } from "react"
import { Mail, Send, Github, Linkedin, CheckCircle, AlertCircle, User, MessageSquare, Upload, Pin, Facebook } from "lucide-react"
import AnimatedContent from "./AnimatedContent"
import { useComments, type Comment } from "@/hooks/useComments"

interface FormData {
  name: string
  email: string
  message: string
}

interface CommentData {
  name: string
  message: string
  profilePhoto?: File | null
}

interface FormStatus {
  type: "success" | "error" | null
  message: string
}

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const [commentData, setCommentData] = useState<CommentData>({
    name: "",
    message: "",
    profilePhoto: null,
  })

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentStatus, setCommentStatus] = useState<FormStatus>({
    type: null,
    message: "",
  })

  // Sử dụng custom hook để tương tác với comments
  const { comments, isLoading, error, addComment } = useComments()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCommentData((prev) => ({
      ...prev,
      profilePhoto: file,
    }))
  }

  // Cập nhật hàm handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      // Gửi dữ liệu form đến API endpoint
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Hiển thị thông báo thành công
      setFormStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingComment(true)
    setCommentStatus({ type: null, message: "" })

    try {
      // Kiểm tra kích thước file ảnh (tối đa 5MB)
      if (commentData.profilePhoto && commentData.profilePhoto.size > 5 * 1024 * 1024) {
        setCommentStatus({
          type: "error",
          message: "Profile photo size must be less than 5MB",
        })
        setIsSubmittingComment(false)
        return
      }

      // Gọi hàm từ hook để thêm comment
      const success = await addComment({
        author: commentData.name,
        content: commentData.message,
        avatar_file: commentData.profilePhoto || null
      })

      if (success) {
        setCommentStatus({
          type: "success",
          message: "Your comment was posted successfully!",
        })

        // Reset form sau khi thêm comment thành công
        setCommentData({
          name: "",
          message: "",
          profilePhoto: null,
        })

        // Reset file input
        const fileInput = document.getElementById('profile-photo') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setCommentStatus({
          type: "error",
          message: "Failed to post your comment. Please try again.",
        })
      }
    } catch (err) {
      console.error("Error submitting comment:", err)
      setCommentStatus({
        type: "error",
        message: "An error occurred while posting your comment.",
      })
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const socialLinks = [
    {
      name: "Let's Connect",
      platform: "on LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/thinhdeeptry",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "GitHub",
      platform: "@thinhdeeptry",
      icon: Github,
      href: "https://github.com/thinhdeeptry",
      color: "bg-gray-700 hover:bg-gray-800",
    },
    {
      name: "Facebook",
      platform: "@Thindeeptryy",
      icon: Facebook,
      href: "https://www.facebook.com/Thindeeptryy/",
      color: "bg-black hover:bg-gray-900",
    },
  ]

  // Hàm để format thời gian
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    // Nếu là hôm nay, hiển thị giờ
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Nếu là trong tuần này
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} min ago`;
      }
      return `${diffHours}h ago`;
    }

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    // Nếu là hơn 1 tuần
    return date.toLocaleDateString();
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900/20 to-black">
      <div id="contact" className="container mx-auto px-8">
        {/* Header - giữ nguyên */}
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0}
          animateOpacity
          scale={1.05}
          startPosition="top 90%"
          endPosition="top 15%"
          scrub={false}
          toggleActions="play none none reverse"
          repeatAnimation={true}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text mb-4">
              Contact Me
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a question? Send me a message, and I'll get back to you soon.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Contact Form - giữ nguyên */}
          <AnimatedContent
            distance={80}
            direction="horizontal"
            reverse={true}
            duration={1}
            initialOpacity={0}
            animateOpacity
            scale={1}
            startPosition="top 80%"
            endPosition="top 20%"
            scrub={false}
            toggleActions="play none none reverse"
            repeatAnimation={true}
          >
            {/* ... Contact Form và Social Links - giữ nguyên */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-gray-400 mb-8">
                  Have something to discuss? Send me a message and let's talk.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="cursor-target w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="cursor-target w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="cursor-target w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Your Message"
                    />
                  </div>

                  {/* Form Status */}
                  {formStatus.type && (
                    <div
                      className={`flex items-center gap-3 p-4 rounded-xl ${formStatus.type === "success"
                          ? "bg-green-900/30 border border-green-500/30 text-green-300"
                          : "bg-red-900/30 border border-red-500/30 text-red-300"
                        }`}
                    >
                      {formStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                      <p className="text-sm">{formStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Social Links */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-white">Connect With Me</h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cursor-target flex items-center gap-4 p-4 rounded-xl ${social.color} transition-all duration-300 hover:scale-[1.02] group`}
                    >
                      <social.icon size={20} className="text-white" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{social.name}</p>
                        <p className="text-white/70 text-sm">{social.platform}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Right Column - Comments Section - cập nhật phần này */}
          <AnimatedContent
            distance={80}
            direction="horizontal"
            reverse={false}
            duration={1}
            initialOpacity={0}
            animateOpacity
            scale={1}
            startPosition="top 80%"
            endPosition="top 20%"
            scrub={false}
            toggleActions="play none none reverse"
            repeatAnimation={true}
          >
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 h-fit">
              {/* Comments Header */}
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-purple-400" size={24} />
                <h3 className="text-2xl font-bold text-white">
                  Comments <span className="text-purple-400">({isLoading ? "..." : comments.length})</span>
                </h3>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-6 mb-8">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={commentData.name}
                    onChange={handleCommentChange}
                    required
                    className="cursor-target w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={commentData.message}
                    onChange={handleCommentChange}
                    required
                    rows={4}
                    className="cursor-target w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Profile Photo <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profile-photo"
                    />
                    <label
                      htmlFor="profile-photo"
                      className="cursor-target flex items-center justify-center gap-3 w-full px-4 py-3 bg-gray-800/30 border border-gray-600/30 border-dashed rounded-xl text-purple-400 hover:bg-gray-700/30 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <Upload size={20} />
                      {commentData.profilePhoto ? commentData.profilePhoto.name : 'Choose Profile Photo'}
                    </label>
                    <p className="text-gray-500 text-xs mt-2">Max file size: 5MB</p>
                  </div>
                </div>

                {/* Comment Form Status */}
                {commentStatus.type && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl ${commentStatus.type === "success"
                        ? "bg-green-900/30 border border-green-500/30 text-green-300"
                        : "bg-red-900/30 border border-red-500/30 text-red-300"
                      }`}
                  >
                    {commentStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm">{commentStatus.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingComment}
                  className="cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmittingComment ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Post Comment
                    </>
                  )}
                </button>
              </form>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-6 h-6 border-2 border-purple-300/30 border-t-purple-500 rounded-full animate-spin" />
                  <span className="ml-3 text-purple-300">Loading comments...</span>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 mb-4">
                  <p className="flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Comments List */}
                  <div className="space-y-4 h-[352px] overflow-y-auto pr-2 custom-scrollbar modern-scrollbar">
                    

                    {/* Comments List */}
                    {comments.length > 0 ? (
                      <>
                        {/* Hiển thị comments được ghim trước */}
                        {comments
                          .filter(comment => comment.is_pinned)
                          .map((comment) => (
                            <div
                              key={comment.id}
                              className="flex gap-4 p-4 bg-gray-800/50 border border-purple-500/20 rounded-xl"
                            >
                              
                              <div className="flex-shrink-0">
                                <img
                                  src={comment.avatar_url || "/placeholder.svg?height=40&width=40"}
                                  alt={comment.author}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-medium">{comment.author}</span>
                                  {comment.is_admin && (
                                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">Admin</span>
                                  )}
                                  <span className="text-gray-500 text-sm ml-auto">{formatTimestamp(comment.created_at)}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        }

                        {/* Hiển thị comments thường */}
                        {comments
                          .filter(comment => !comment.is_pinned)
                          .map((comment) => (
                            <div
                              key={comment.id}
                              className="flex gap-4 p-4 bg-gray-800/30 border border-gray-700/20 rounded-xl hover:bg-gray-800/40 transition-colors duration-200"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={comment.avatar_url || "/placeholder.svg?height=40&width=40"}
                                  alt={comment.author}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-medium">{comment.author}</span>
                                  {comment.is_admin && (
                                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">Admin</span>
                                  )}
                                  <span className="text-gray-500 text-sm ml-auto">{formatTimestamp(comment.created_at)}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}

export default ContactMe
