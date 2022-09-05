
import axios from "axios"
import {Subject} from "rxjs"
 const answerSubject= new Subject<{correct:boolean,score:number}>()

 const loadingSubject=new Subject<boolean>()


export const qaService={
    askQuestion:askQuestion,
    getAnswer$:()=>answerSubject.asObservable(),
    getLoading$:()=>loadingSubject.asObservable()
}
  
const CORRECT_RATIO=0.9
function askQuestion(sentence:string){
    loadingSubject.next(true)
    axiosClient.get<QaResponse[]>("/",{params:{sentence:sentence}}).then(
        response=>{
           let first =response.data[0];
           if(first.Score>=CORRECT_RATIO)
           answerSubject.next({correct:true,score:Math.round(first.Score*100)})
           else
           answerSubject.next({correct:false,score:wrongScoreFix(Math.round(first.Score*100))})



        }
    ).finally(
        ()=>{
            loadingSubject.next(false)
        }
    )
}

function wrongScoreFix(score:number){
score-=50
if (score<0) return 0
return score

}


interface QaResponse{
    
        index: 0,
        Subject: string,
        Score: number
    
}


const BACKEND_BASE_URL="https://projet-fin-detudes.herokuapp.com/"
const axiosClient = axios.create({
    baseURL: BACKEND_BASE_URL,
    
  });