import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TextEditorProps = {
  content:string,
  setContent:React.Dispatch<React.SetStateAction<string>>
}

export const TextEditor = (props:TextEditorProps) => {
  const modules = {
    toolbar: [     
      [{ 'font': [] }],
      [{ 'color': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
  ]
  
  return <ReactQuill 
          theme="snow" 
            modules={modules}
            formats={formats}
          value={props.content} 
          onChange={props.setContent} />

}