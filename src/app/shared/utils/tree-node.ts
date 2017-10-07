import {List} from "linq-collections";

export interface ITreeNode<T> {
  node: T,
  parent: ITreeNode<T>,
  children: List<ITreeNode<T>>,
}

//TODO does this work?
export default ITreeNode;
