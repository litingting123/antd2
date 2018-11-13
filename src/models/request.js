import * as url from '../services/dataUrl';
export default {
  namespace: 'request',
  state: {
    data: [],
  },
  effects: {
    * requestResult({ payload }, { call, put }) {
      const result = yield call(url.dataUrl, payload);
      if(payload){
        const resultArr = result.data.apis;
        const searchArr = [];
        console.log("拿到了数据",resultArr)
        for(let key in resultArr){
          for(let keys in resultArr[key]){
            for(let i in resultArr[key]['tags']){
              if(resultArr[key]['tags'][i].indexOf(payload)>=0){
              searchArr.push(resultArr[key])
            }
            }
        }
        }
        console.log('最终结果',Array.from(new Set(searchArr)))
        yield put({
        type: 'finalResult',
        payload: {
          data: Array.from(new Set(searchArr))
        }
      })

      }else{
        yield put({
        type: 'finalResult',
        payload: {
          data: result.data.apis
        }
      })
      }
    }
  },
  reducers: {
    finalResult(state, action) {
      return {
        ...state,
        data: action.payload.data
      };
    },
  },
};