import React, { useState, useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";
import { Button } from "../../component";
import { RxCrossCircled } from "react-icons/rx";
import { GrFormPreviousLink } from "react-icons/gr";
import { BiImageAdd } from "react-icons/bi";
import {
  Loader,
  admin,
  headerImage,
  loader as loadergif,
  Rolling,
} from "../../component/Icones/index";
import { Input } from "../../component/index";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { database } from "../../appwrite";
import { login } from "../../store/appSlice";

function SetUp({ setUp, postData }) {
  const [pagesNum, setPagesNum] = useState(1);
  const user = useSelector((state) => state.appReducer.user);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [textAreaElements, setTextAreaElements] = useState({
    redColor: false,
    focus: false,
    height: "28px",
  });
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      profileImg: postData[1]?.profileImg || "",
      headerImg: postData[1]?.headerImg || "",
      bio: postData[1]?.bio || "",
      name: postData[1]?.name || "",
    },
  });
  const [formData, setFormData] = useState({
    profileImg: "",
    headerImg: "",
    bioData: "",
    name: "",
  });
  const [buttonValue, setButtonValue] = useState("Skip for Now");

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  const handleSetUp = () => {
    setButtonValue("Skip for Now");
    if (pagesNum > 3 || pagesNum <= 0) return;
    setPagesNum((prev) => prev + 1);
  };
  const handleBio = (e) => {
    const { scrollHeight, clientHeight } = e.target;
    if (scrollHeight > clientHeight) {
      setTextAreaElements((prev) => ({ ...prev, height: `${scrollHeight}px` }));
    }
    if (e.target.value.length > 160) {
      return;
    } else {
      setFormData((prev) => ({ ...prev, bioData: e.target.value }));
    }
  };
  useEffect(() => {
    if (formData.profileImg !== "" && pagesNum === 1) {
      setButtonValue("Next");
    } else if (
      formData.headerImg !== "" ||
      (formData.name !== "" && pagesNum === 2)
    ) {
      setButtonValue("Next");
    } else if (formData.bioData !== "" && pagesNum === 3) {
      setButtonValue("Next");
    } else {
      setButtonValue("Skip for Now");
    }
  }, [formData, pagesNum]);
  useEffect(() => {
    if (formData.bioData.length >= 160) {
      setTextAreaElements((prev) => ({ ...prev, redColor: true }));
    } else {
      setTextAreaElements((prev) => ({ ...prev, redColor: false }));
    }
  }, [formData.bioData]);

  // FORM SUBMIT
  const formSubmit = async (data) => {
    setError("");
    setLoader(true);
    if (!loader) {
      if (
        formData.bioData === "" &&
        formData.headerImg === "" &&
        formData.profileImg === "" &&
        formData.name === ""
      ) {
        setUp(false);
        return;
      }
      let keys = ["profileImg", "headerImg"];
      let promises = keys.map(async (key) => {
        if (postData[1][key]) {
          let file =
            postData[1][key] !== data[key]
              ? await database.deleteFile(postData[1][key])
              : null;
          if (file) {
            return database.createFile(data[key][0]).then((fileId) => {
              if (fileId) {
                data[key] = fileId.$id;
              }
            });
          }
        } else {
          if (data[key]) {
            return database.createFile(data[key][0]).then((fileId) => {
              data[key] = fileId.$id;
            });
          }
        }
      });
      Promise.all(promises).then(() =>
        database
          .updateUsers(postData[1].$id, { ...data })
          .then(() => {
            setUp(false);
          })
          .catch((error) => setError(error))
          .finally(() => setLoader(false))
      );
    }
  };
  if (Object.keys(postData[0]).length <= 0 && postData[1].length <= 0) {
    return (
      <Loader
        loaderSrc={Rolling}
        classParent={"h-full items-center"}
        className={"h-[100px]"}
      />
    );
  }

  return (
    <div className="pt-4 px-20 flex flex-col h-full pb-4">
      <form onSubmit={handleSubmit(formSubmit)} className="h-full">
        {pagesNum === 1 ? (
          <div
            className="absolute top-2 left-2 text-[30px] text-black rounded-full hover:text-gray-600 transition-all select-none"
            onClick={() => setUp(false)}
          >
            <RxCrossCircled />
          </div>
        ) : (
          <div
            className="absolute top-2 left-2 text-[30px] text-black rounded-full hover:text-gray-600 transition-all select-none"
            onClick={() => setPagesNum((prev) => prev - 1)}
          >
            <GrFormPreviousLink />
          </div>
        )}
        <div className="w-full flex justify-center text-[26px] h-[10%]">
          {pagesNum >= 4 || <BsTwitterX />}
        </div>
        {/* CONDITIONAL RENDERING */}
        {pagesNum === 1 && (
          <div className="flex flex-col justify-between h-[80%] relative">
            <div className="flex gap-y-2 flex-col ">
              <h1 className="text-3xl font-bold">Pick a profile picture</h1>
              <p>Have favorite selfie? Upload it now.</p>
            </div>
            <div className="flex justify-center items-center w-60 h-60 rounded-full absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden">
              <div className="absolute w-12 h-12 rounded-full overflow-hidden z-10 bg-gray-800 flex justify-center items-center overflow">
                <Input
                  type="file"
                  className="opacity-0 relative z-[11]"
                  accept="image/jpg,image/png,image/gif"
                  {...register("profileImg")}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      profileImg: URL.createObjectURL(e.target.files[0]),
                    }));
                  }}
                />

                <div className="absolute text-3xl text-white">
                  <BiImageAdd />
                </div>
              </div>
              <img
                src={formData.profileImg || postData[0].profileImg || admin}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {pagesNum === 2 && (
          <div className="flex flex-col overflow-y-auto h-[80%] w-full">
            <div className="flex gap-y-2 flex-col ">
              <h1 className="text-3xl font-bold">Pick a header</h1>
              <p>People who visit you profile will see it. Show your style.</p>
            </div>
            <div>
              <div className="bg-gray-400 h-36 w-full mt-20 flex justify-center items-center overflow-hidden relative">
                <img
                  src={
                    formData.headerImg || postData[0].headerImg || headerImage
                  }
                  alt=""
                  className="absolute w-full h-full object-cover"
                />
                <div className="h-10 w-10 rounded-full cursor-pointer overflow-hidden flex items-center justify-center relative">
                  <Input
                    type="file"
                    className="relative z-40 opacity-0 cursor-default h-full"
                    accept="image/jpg,image/png,image/gif"
                    {...register("headerImg")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        headerImg: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                  />
                  <div className="absolute text-3xl text-white">
                    <BiImageAdd />
                  </div>
                </div>
              </div>
              <div className="h-32 w-32 rounded-full overflow-hidden mt-2">
                <img
                  src={formData.profileImg || postData[0].profileImg || admin}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <Input
                  className={"text-2xl font-bold text-gray-800 border-none"}
                  {...register("name")}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <p className="text-[15px] text-gray-500 font-normal">
                  @Raheemkhan434343
                </p>
              </div>
            </div>
          </div>
        )}
        {pagesNum === 3 && (
          <div className="flex flex-col h-[80%]">
            <div className="flex gap-y-2 flex-col ">
              <h1 className="text-3xl font-bold">Describe yourself</h1>
              <p>
                What makes you special? Don't think too hard.just have fun with
                it.
              </p>
            </div>
            <div
              className={`rounded border-2 border-black px-2 py-2 ${
                textAreaElements.focus ? "border-blue-500" : "borer-black"
              } mt-10`}
            >
              <div className={`flex justify-between text-semibold`}>
                <p
                  className={`${
                    textAreaElements.focus ? "text-blue-500" : "text-black"
                  }`}
                >
                  Your Bio
                </p>
                <p
                  className={`${
                    textAreaElements.redColor ? "text-red-600" : "text-black"
                  }`}
                >
                  {formData.bioData.length}/160
                </p>
              </div>
              <textarea
                onBlurCapture={(e) =>
                  setTextAreaElements((prev) => ({ ...prev, focus: false }))
                }
                onFocus={() =>
                  setTextAreaElements((prev) => ({ ...prev, focus: true }))
                }
                className={`outline-none resize-none w-full h-[${textAreaElements.height}]`}
                {...register("bio")}
                onChange={handleBio}
                style={{ height: textAreaElements.height, overflow: "hidden" }}
              ></textarea>
            </div>
          </div>
        )}
        {pagesNum === 4 && (
          <div className="flex flex-col justify-between h-[80%]">
            <div className="w-full flex flex-col items-center mt-12 gap-y-4">
              <div className="text-red-600 text-xl font-medium">{error}</div>
              <div className="text-[38px]">
                <BsTwitterX />
              </div>
              <div>
                <h1 className="text-2xl font-bold mt-8">
                  Click to save updates
                </h1>
              </div>
              <div className="w-2/3">
                <Button
                  className={
                    "w-full py-2 border-none text-white bg-black transition-all"
                  }
                  type={"submit"}
                  id="setupButton"
                >
                  Save
                </Button>
              </div>
              {loader && (
                <div>
                  <Loader className="w-[30%]" loaderSrc={loadergif} />
                </div>
              )}
            </div>
          </div>
        )}
      </form>
      {pagesNum === 4 || (
        <div className="h-[10%]">
          <Button
            className={
              "w-full py-2 border hover:bg-slate-200 transition-all select-none"
            }
            type={"button"}
            id="setupButton"
            onClick={handleSetUp}
          >
            {buttonValue}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SetUp;
