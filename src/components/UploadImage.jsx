import { Component, createRef } from "react";
import { connect } from "react-redux";
import { setImageUrl } from "../redux/uploadImageReducer";
import "../styles/UploadImage.css";
import { API_BASE_URL } from "../api/url";

export class DropImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      blob: API_BASE_URL + this.props.img,
      isDragEnter: false,
    };
    this.inputFileRef = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.file !== prevState.file && this.state.file) {
      const blob = URL.createObjectURL(this.state.file);
      this.setState({ blob });
      this.props.setImageUrl(blob);
    }
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.blob);
    window.removeEventListener("dragover", this.preventDefaultHandler);
    window.removeEventListener("drop", this.preventDefaultHandler);
  }

  preventDefaultHandler = (e) => {
    e.preventDefault();
  };

  onFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      if (!newFile.type.match("image.*")) {
        console.log("File không đúng định dạng");
      } else {
        if (this.inputFileRef.current) {
          this.inputFileRef.current.value = null;
        }
        this.setState({ file: newFile });
      }
    }
  };

  onDragLeave = () => {
    this.setState({ isDragEnter: false });
  };

  onDragEnter = () => {
    this.setState({ isDragEnter: true });
  };

  onDrop = (e) => {
    e.preventDefault();
    this.setState({ isDragEnter: false });
    const newFile = e.dataTransfer.files?.[0];
    if (newFile) {
      if (!newFile.type.match("image.*")) {
        console.log("File không đúng định dạng");
      } else {
        this.setState({ file: newFile });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("dragover", this.preventDefaultHandler);
    window.addEventListener("drop", this.preventDefaultHandler);
  }

  render() {
    return (
      <div
        style={{
          "--bg": `url(${this.state.blob})`,
        }}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onClick={() =>
          this.inputFileRef.current && this.inputFileRef.current.click()
        }
        className={`${this.state.blob ? "before-bg-file" : ""
          } relative p-6 cursor-pointer mx-auto flex flex-col items-center border-2 border-dashed border-blue-600 text-base leading-[1.6] select-none`}
      >
        <input
          ref={this.inputFileRef}
          onChange={this.onFileChange}
          type="file"
          accept="image/*"
          hidden
        />
        <p className="text-center my-3 pointer-events-none">
          Thêm ảnh món ăn của bạn tại đây
        </p>
        <p className="text-center text-[#F05123] pointer-events-none">
          {this.state.isDragEnter
            ? "Thả ảnh vào đây"
            : "Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh"}
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setImageUrl,
};

export default connect(null, mapDispatchToProps)(DropImageInput);
