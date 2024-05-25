import { AiOutlineCloudUpload } from "react-icons/ai";

interface UploadFileProps {
  setFile: any;
  url?: any;
}

const UploadFile: React.FC<UploadFileProps> = ({ setFile, url }) => {
  return (
    <div className="flex h-14 items-center ">
      <div className="w-10/12">
        <label
          htmlFor="file-input"
          className="w-2/6 text-white py-2 px-4 rounded-md bg-blue-500 hover:cursor-pointer hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out flex justify-center items-center"
        >
          <AiOutlineCloudUpload size={30} />
          <span className="ml-2">Upload</span>
        </label>
      </div>
      <input
        accept="image/*"
        type="file"
        id="file-input"
        onChange={setFile}
        style={{ display: "none" }}
      />
      <div className="w-2/12 h-full">
        <img
          id="img-preview"
          src={`${url?.name ? URL.createObjectURL(url) : ""}`}
          className={`object-cover ${url?.name ? "block" : "hidden"} w-16 h-16`}
        />
      </div>
    </div>
  );
};

export default UploadFile;
