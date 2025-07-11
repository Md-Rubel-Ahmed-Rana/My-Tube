import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ["link"],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};

const RichTextEditor = ({ value, onChange, isDisabled = false }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{ toolbar: toolbarOptions }}
      readOnly={isDisabled}
      className="border rounded-md"
    />
  );
};

export default RichTextEditor;
