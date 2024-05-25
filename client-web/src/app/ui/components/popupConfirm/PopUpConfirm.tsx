import { props } from "./popupProps";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import style from "./styles.module.css";

const PopUpConfirm: React.FC<props> = ({
  title,
  children,
  message,
  data,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  /**
   * hàm này để đóng popup
   */
  const onClose = useCallback(() => {
    setOpen(!open);
  }, [open]);
  /**
   * hàm này để Open popup
   */
  const onOpen = useCallback(() => {
    setInitialLoad(false);
    setOpen(true);
  }, []);

  /**
   * hàm này để thực hiện hành động và đóng popup
   */
  const onConfirmAndClose = useCallback(() => {
    if (data && onConfirm) {
      onConfirm(data);
    }
    onClose();
  }, [onConfirm, onClose, data]);

  /**
   * hàm này để đóng popup khi click ra ngoài
   */
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      // code này để kiểm tra xem click có phải là click ra ngoài popup hay không
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // nếu popup mở thì lắng nghe sự kiện click ra ngoài
    if (open) {
      document.addEventListener("click", handleClickOutside);
    }
  }, [open, handleClickOutside]);

  return (
    <div className="">
      <div
        className={`relative w-full flex flex-col justify-center items-center `}
        ref={popupRef}
      >
        <div
          className={` rounded-md shadow-lg border-2 border-gray-100 bg-white w-64 absolute h-[100px] -top-[100px] p-2 ${open ? style.show : initialLoad ? "hidden" : style.hide} z-40`}
        >
          <div className="inner bg-white w-full h-full flex flex-col justify-center items-center">
            <div className="mess w-full h-3/5 flex flex-col justify-between items-start">
              <div className=" flex w-full items-center">
                <BiSolidMessageRoundedError className="size-5 text-orange-300" />
                <div className="font-semibold ml-1 text-sm">
                  <p>{title}</p>
                </div>
              </div>
              <div className="text-sm pl-4 font-light text-start">
                <p>{message}</p>
              </div>
            </div>
            <div className="btn w-full h-2/5 flex justify-end items-center mt-2">
              <div className="pr-2 font-light text-center text-base">
                <button
                  className="px-2 mr-2 rounded-md border-2 border-gray-100 shadow-lg hover:text-red-400 hover:border-red-200"
                  onClick={onClose}
                >
                  <span>No</span>
                </button>
                <button
                  className="px-2 rounded-md bg-primary-1-color shadow-lg text-white"
                  onClick={onConfirmAndClose}
                >
                  <span>Yes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {React.cloneElement(children as React.ReactElement, {
          onClick: onOpen,
        })}
      </div>
    </div>
  );
};

export default PopUpConfirm;
