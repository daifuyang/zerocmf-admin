
interface DataState {
    title: string;
    id?: number;
  }
  
  // 暴露弹窗的行为
  export interface SaveAction {
    open: (_data: DataState) => void;
  }