import { Input, message } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import cookiesStore from "../../../plugins/cookiesStore";
import GeneralLoading from "../../../components/base/GeneralLoading";
import { DEFINE_ROUTERS_ADMIN } from "../../../constants/route-mapper";
import authService from "../../../services/authService";
import Logo from "../../../components/icons/Logo";

export default function LoginAdmin() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async () => {
    if (!(form.email && form.password)) {
      message.error("Please enter user name and password");
      return;
    }
    try {
      setLoading(true);
      const rs = await authService.login({
        email: form.email,
        password: form.password,
      });
      cookiesStore.set("access_token", rs.data.accessToken);
      cookiesStore.set("admin", "admin");
      navigate(DEFINE_ROUTERS_ADMIN.homeAdmin);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralLoading isLoading={loading} />
      <div
        className="flex h-[100vh] w-full justify-center items-center"
        style={{
          backgroundImage: `url(/background_desktop.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-full">
                      <div className="md:mx-6 md:p-12">
                        <div className="text-center flex flex-col justify-center items-center">
                          <Logo />
                          <h4 className="mb-6 mt-1 pb-1 text-2xl font-semibold max-w-[460px] text-blue-950">
                            Trang quản lý WinMobile
                          </h4>
                        </div>

                        <form>
                          <p className="mb-4 text-blue-950">
                            Đăng nhập để tiếp tục
                          </p>
                          {/* <!--email input--> */}
                          <Input
                            type="text"
                            placeholder="Email"
                            className="mb-4"
                            value={form.email}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") { onHandleSubmit(); }
                            }}
                            onChange={(e) => { setForm((pre) => ({  ...pre, email: e.target.value, })); }}
                          ></Input>
                          <Input.Password
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                            value={form.password}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onHandleSubmit();
                              }
                            }}
                            onChange={(e: any) => {
                              setForm((pre) => ({
                                ...pre,
                                password: e.target.value,
                              }));
                            }}
                          ></Input.Password>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 text-base bg-blue-950 inline-block w-full rounded px-6 pb-2 pt-2.5  font-medium uppercase leading-normal"
                              type="button"
                              onClick={() => onHandleSubmit()}
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
