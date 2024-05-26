import { IoIosCloseCircleOutline } from "react-icons/io";
import style from "./styles.module.css";
import { IoLogOutOutline } from "react-icons/io5";
import { useCallback, useContext } from "react";
import { LoginContext } from "@/app/lib/context/LoginContext";
import { LoginActionType } from "@/app/lib/Types";

export const SideBar = ({
  open,
  onClose,
}: Readonly<{ open: boolean; onClose: () => void }>): JSX.Element => {
  const { stateLogin, dispatchLogin } = useContext(LoginContext);
  const Logout = useCallback(() => {
    dispatchLogin({ type: LoginActionType.LOGOUT });
  }, [dispatchLogin]);

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full h-screen bg-black/15 ${!open && style.AnimationSideBarClose}`}
    >
      <div
        className={`relative w-4/5 bg-white h-screen ${open && style.AnimationSideBarOpen} `}
      >
        <div className="flex w-full justify-end items-center">
          <div className="p-2">
            <IoIosCloseCircleOutline
              size={25}
              className="hover:cursor-pointer text-primary-1-color"
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-0 w-full ">
          <div className="flex flex-row w-full justify-between items-center px-2">
            <div className="text-lg ">
              <p>Logout</p>
            </div>
            <div className="hover:cursor-pointer">
              <IoLogOutOutline
                className="size-8 text-primary-1-color"
                onClick={() => {
                  Logout();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
