export const EmotionChart = (result = []) => {

    return <div className={'my-8 text-left'}>
        <h2 className={'font-bold text-xl mb-1'}>Results</h2>
        <p className={'text-lg'}>The analysis of your audio recording results in the following probabilites: </p>
        {result.result.map(({name, prob}) => <div className={'my-6'}>
            <div className={'flex justify-between'}><span>Your dog is <span className={'font-semibold'}>{name}</span></span><span>{parseFloat(prob * 100).toFixed(2)}%</span>
            </div>
            <div className={'w-full bg-gray-100 h-[15px] my-1'}>
                <div className={`w-[${Math.round(prob * 100)}px] bg-gray-500 h-full grow-0`}
                     style={{width: Math.round(prob * 100) + '%'}}></div>
            </div>
        </div>)}
    </div>

}