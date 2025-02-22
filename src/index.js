import './styles/styles.css'
import Setup from "./components/Setup"
import Helper from './components/Helper'
import FileHandle from './components/FileHandle'

const setup = new Setup()
const helper = new Helper(setup._scene)
helper.gridHelper()
const fileHandle = new FileHandle(setup._scene);

document.getElementById('file').addEventListener('change', (e) => {
    fileHandle.selectModelFromInput(e);
});


