import React from 'react';
import ReturnDeliveryItem from "./ReturnDeliveryItem";



const list = [
    { "title" : "배송정보" , 
        "text1" : "상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.",
        "text2" : "일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.",
        "text3" : "동일 브랜드의 상품이라도 상품별 출고일시가 달라 각각 배송될 수 있습니다.",
        "text4" : "제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.",
        "text5" : "상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다."
    }, 
    { "title" : "취소/반품/교환 안내" , 
        "text1" : "상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.",
        "text2" : "일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.",
        "text3" : "동일 브랜드의 상품이라도 상품별 출고일시가 달라 각각 배송될 수 있습니다.",
        "text4" : "제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.",
        "text5" : "상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다."
    }, 
    { "title" : "반품/교환 불가능한 경우" , 
        "text1" : "상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.",
        "text2" : "일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.",
        "text3" : "동일 브랜드의 상품이라도 상품별 출고일시가 달라 각각 배송될 수 있습니다.",
        "text4" : "제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.",
        "text5" : "상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다."
    }, 
    { "title" : "A/S 안내" , 
        "text1" : "상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.",
        "text2" : "일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.",
        "text3" : "동일 브랜드의 상품이라도 상품별 출고일시가 달라 각각 배송될 수 있습니다.",
        "text4" : "제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.",
        "text5" : "상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다."
    }
];


export default function ReturnDelivery() {
    return (
        <>
        <div className='delivery' id='delivery'>
        <div className="tab_nav">
            <ul>
                <li><a href="#detail">DETAIL</a></li>
                <li><a href="#review">REVIEW</a></li>
                <li><a href="#qna">Q&A</a></li>
                <li className="on"><a href="#delivery">RETURN & DELIVERY</a></li>
            </ul>
        </div>
            <div className='return_delivery-main'>
                <div className='return_delivery-text'>
                    <h3>배송/교환/반품/AS 관련 유의사항</h3>
                    <p>상품상세설명에 배송/교환/반품/취소 관련 안내가 기재된 경우 다음 안내사항보다 우선 적용됩니다.</p>
                </div>
                <ul>
                    {list && list.map((item)=>
                    <li className='aaa'>
                        <ReturnDeliveryItem 
                            title={item.title} 
                            text1={item.text1} 
                            text2={item.text2} 
                            text3={item.text3} 
                            text4={item.text4} 
                            />
                    </li>
                    
                    )}
                </ul>
            </div>
        </div>
        </>
    );
}

