/**
 * 泽羚自定义的Redux接口，如果你的Model报错了，那么就使用这里的接口
 */
import { Action, AnyAction } from 'redux';

/**
 * 使用这个Reducer来避免Model中提示state中不能为空的错误
 */
export type IZlRender1<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;
