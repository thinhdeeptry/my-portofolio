"use client"
import ProfileCard from "./profileCard";

export default function ProfileCardWrapper() {
  return (
    <ProfileCard
      name="Nguyễn Đức Thịnh"
      title="Software Engineer"
      handle="thinhdeeptry"
      status="Online"
      contactText="Contact Me"
      avatarUrl="/avatar2.png"
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      onContactClick={() => console.log('Contact clicked')}
    />
  );
}