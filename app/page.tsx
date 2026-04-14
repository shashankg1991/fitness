'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{minHeight:'100vh',background:'#09090f',display:'flex',flexDirection:'column',padding:'0 0 40px'}}>
      {/* hero */}
      <div style={{padding:'64px 28px 40px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <p className="mono" style={{fontSize:11,letterSpacing:4,color:'rgba(255,255,255,0.3)',marginBottom:20}}>YOUR PERSONAL TRAINER</p>
        <h1 className="syne" style={{fontSize:52,fontWeight:800,lineHeight:1.05,color:'#fff',marginBottom:12}}>
          Train.<br/><span style={{color:'#ff6b35'}}>Eat.</span><br/>Repeat.
        </h1>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.45)',lineHeight:1.7,maxWidth:300,marginBottom:48}}>
          Workouts with form guides, auto-timers, and abs. 31-day Indian veg diet with full recipes.
        </p>

        {/* profile chip */}
        <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 16px',background:'rgba(255,255,255,0.05)',borderRadius:100,border:'1px solid rgba(255,255,255,0.08)',marginBottom:48,width:'fit-content'}}>
          <div style={{width:8,height:8,borderRadius:4,background:'#30d158'}}/>
          <span className="mono" style={{fontSize:11,color:'rgba(255,255,255,0.45)',letterSpacing:1}}>35 · 73 KG · 5'10" · LEAN MUSCLE</span>
        </div>

        {/* nav cards */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <Link href="/workout" style={{textDecoration:'none'}}>
            <div style={{
              background:'linear-gradient(135deg,rgba(255,107,53,0.12) 0%,rgba(255,107,53,0.04) 100%)',
              border:'1px solid rgba(255,107,53,0.2)',borderRadius:24,padding:'28px 24px',
              display:'flex',alignItems:'center',justifyContent:'space-between',
            }}>
              <div>
                <p className="mono" style={{fontSize:10,letterSpacing:3,color:'rgba(255,107,53,0.7)',marginBottom:8}}>WORKOUT</p>
                <h2 className="syne" style={{fontSize:28,fontWeight:700,color:'#fff',marginBottom:6}}>Daily Training</h2>
                <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>Bro split or PPL · Auto-timer<br/>Warmup · Abs · Cooldown</p>
              </div>
              <div style={{width:52,height:52,borderRadius:16,background:'rgba(255,107,53,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>🏋️</div>
            </div>
          </Link>

          <Link href="/diet" style={{textDecoration:'none'}}>
            <div style={{
              background:'linear-gradient(135deg,rgba(48,209,88,0.12) 0%,rgba(48,209,88,0.04) 100%)',
              border:'1px solid rgba(48,209,88,0.2)',borderRadius:24,padding:'28px 24px',
              display:'flex',alignItems:'center',justifyContent:'space-between',
            }}>
              <div>
                <p className="mono" style={{fontSize:10,letterSpacing:3,color:'rgba(48,209,88,0.7)',marginBottom:8}}>DIET</p>
                <h2 className="syne" style={{fontSize:28,fontWeight:700,color:'#fff',marginBottom:6}}>31-Day Meal Plan</h2>
                <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>Indian vegetarian · No egg<br/>Full recipes · ~135g protein</p>
              </div>
              <div style={{width:52,height:52,borderRadius:16,background:'rgba(48,209,88,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>🥗</div>
            </div>
          </Link>
        </div>
      </div>

      {/* stats row */}
      <div style={{margin:'0 28px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {[['7','Days/Week'],['31','Meal Days'],['2','Splits']].map(([n,l])=>(
          <div key={l} style={{background:'rgba(255,255,255,0.04)',borderRadius:16,padding:'16px 12px',textAlign:'center',border:'1px solid rgba(255,255,255,0.07)'}}>
            <div className="syne" style={{fontSize:26,fontWeight:800,color:'#ff6b35'}}>{n}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
