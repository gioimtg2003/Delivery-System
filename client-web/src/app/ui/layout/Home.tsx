import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="flex-auto w-6/12 xl:w-5/12 p-8">{children}</div>
        <div className="flex-auto min-h-screen w-6/12 xl:w-7/12 bg-primary-color hidden md:block">
          <div className="content flex flex-row pt-40 pb-20 justify-center items-center">
            <div className="w-7/12 lg:w-6/12 xl:w-5/12 text-center">
              <h1 className="text-wrap text-4xl ">Welcome!</h1>
              <p className="pt-4 text-slate-500">
                Chào mừng bạn đến với hệ thống quản lý giao hàng linh hoạt và
                tiện lợi.
              </p>
            </div>
          </div>
          <Image
            src={"/images/Logo.png"}
            width={350}
            height={320}
            alt="Error"
            className="mx-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
