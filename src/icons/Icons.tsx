
interface PropsUserIcos {
  className?: string
}

export const UserIcon = ({ className }: PropsUserIcos) => (
    <svg width="60px" height="60px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <path id="user-a" d="M6,0 L10,0 C10,1.1045695 9.1045695,2 8,2 C6.8954305,2 6,1.1045695 6,0 Z M16,13.4537699 C13.3119196,14.48459 10.6263029,15 7.94314973,15 C5.2599966,15 2.61228002,14.48459 0,13.4537699 C0.534574606,9.15125664 3.18229118,7 7.94314973,7 C12.7040083,7 15.389625,9.15125664 16,13.4537699 Z"/>
      <path id="user-c" d="M9,10 C6.23857625,10 4,7.76142375 4,5 C4,2.23857625 6.23857625,0 9,0 C11.7614237,0 14,2.23857625 14,5 C14,7.76142375 11.7614237,10 9,10 Z M9,8 C10.6568542,8 12,6.65685425 12,5 C12,3.34314575 10.6568542,2 9,2 C7.34314575,2 6,3.34314575 6,5 C6,6.65685425 7.34314575,8 9,8 Z M1.99975067,20.0223292 C1.98741862,20.5744762 1.52981788,21.0120827 0.977670834,20.9997507 C0.425523784,20.9874186 -0.0120827307,20.5298179 0.000249326899,19.9776708 C0.145759691,13.46269 3.22368513,11 8.99994472,11 C15.0478478,11 18.1410179,13.4818866 17.9949389,20.0223292 C17.9826068,20.5744762 17.5250061,21.0120827 16.972859,20.9997507 C16.420712,20.9874186 15.9831055,20.5298179 15.9954375,19.9776708 C16.1173753,14.5181134 13.8803831,13 8.99994472,13 C4.37762816,13 2.12225712,14.53731 1.99975067,20.0223292 Z"/>
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 1)">
      <g transform="translate(1 5)">
        <mask id="user-b" fill="#ffffff">
          <use xlinkHref="#user-a"/>
        </mask>
        <use fill="#D8D8D8" xlinkHref="#user-a"/>
        <g fill="#FFA0A0" mask="url(#user-b)">
          <rect width="24" height="24" transform="translate(-4 -6)"/>
        </g>
      </g>
      <mask id="user-d" fill="#ffffff">
        <use xlinkHref="#user-c"/>
      </mask>
      <use fill="#000000" fillRule="nonzero" xlinkHref="#user-c"/>
      <g fill="#7600FF" mask="url(#user-d)">
        <rect width="24" height="24" transform="translate(-3 -1)"/>
      </g>
    </g>
  </svg>
)

export const Circle = ({ className }: PropsUserIcos) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" className={className}>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <title></title>
    <g id="Complete">
      <g id="Circle">
        <circle cx="12" cy="12" data-name="Circle" fill="none" id="Circle-2" r="10" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
      </g>
    </g>
  </g>
</svg>
)

export const Triangle = ({ className }: PropsUserIcos) => (
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g id="Shape / Triangle">
      <path id="Vector" d="M4.37891 15.1999C3.46947 16.775 3.01489 17.5634 3.08281 18.2097C3.14206 18.7734 3.43792 19.2851 3.89648 19.6182C4.42204 20.0001 5.3309 20.0001 7.14853 20.0001H16.8515C18.6691 20.0001 19.5778 20.0001 20.1034 19.6182C20.5619 19.2851 20.8579 18.7734 20.9172 18.2097C20.9851 17.5634 20.5307 16.775 19.6212 15.1999L14.7715 6.79986C13.8621 5.22468 13.4071 4.43722 12.8135 4.17291C12.2957 3.94236 11.704 3.94236 11.1862 4.17291C10.5928 4.43711 10.1381 5.22458 9.22946 6.79845L4.37891 15.1999Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
  </g>
</svg>
)

export const Square = ({ className }: PropsUserIcos) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g id="Shape / Square">
      <path id="Vector" d="M3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H17.8031C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2837 20.7822 19.9074C21 19.48 21 18.921 21 17.8031V6.19691C21 5.07899 21 4.5192 20.7822 4.0918C20.5905 3.71547 20.2837 3.40973 19.9074 3.21799C19.4796 3 18.9203 3 17.8002 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
  </g>
</svg>
)

export const Diamond = ({ className }: PropsUserIcos) => (
<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className={className}>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <title>diamond</title>
    <path d="M30.531 15.47l-14.001-14c-0.136-0.136-0.323-0.22-0.53-0.22s-0.395 0.084-0.53 0.22l-14 14c-0.136 0.136-0.22 0.323-0.22 0.53s0.084 0.395 0.22 0.53l14 14.001c0.136 0.135 0.323 0.219 0.53 0.219s0.394-0.084 0.53-0.219l14.001-14.001c0.135-0.136 0.218-0.323 0.218-0.53s-0.083-0.394-0.218-0.53l0 0zM16 28.939l-12.939-12.939 12.939-12.939 12.939 12.939z"></path>
  </g>
</svg>
)
