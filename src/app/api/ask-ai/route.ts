import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

const recipeTemplate = `
당신은 100년 경력의 전문 요리사이며, 세계 최고 수준의 요리 실력을 보유하고 있고 모든 레시피를 섭렵한 전문가입니다.

요청받은 요리에 대해 반드시 다음을 지켜주세요:

1. 요청이 "특정 요리명"일 경우
   - 해당 요리의 정통 재료를 정확히 지키며 정통 레시피를 작성합니다.
   - 요청된 요리가 [고정 룰]에 있을 경우 반드시 고정 룰을 적용합니다.
   - 고정 룰 적용 시, 요리의 조리 시간도 현실적으로 설정합니다.
     - (예시) 오향장육은 "2시간 이상" 소요, 절대 30분 등으로 축소하지 않습니다.

2. 요청이 "상황, 기분, 재료 기반 추천"일 경우
   - 주어진 키워드(예: 대파, 계란 / 비 오는 날 / 매콤한 음식)를 분석합니다.
   - 고정 룰은 절대 적용하지 않습니다.
   - 주어진 재료를 포함하면서, 가장 적합하고 대중적인 요리 1가지를 자유롭게 창의적으로 추천합니다.
   - 특정 요리(예: 오향장육)만 고정적으로 추천하는 것은 금지합니다.
   - 추천하는 요리는 최소 1가지, 최대 3가지 후보 중 가장 적합한 하나를 선택해 작성합니다.

3. 재료 사용 시 주어진 재료를 반드시 포함합니다.
   - (예시) "대파, 계란 요리" 요청 시 둘 다 포함된 요리를 추천합니다.

4. 추천 요리 선택 후, 해당 요리에 대해 정통 레시피를 작성합니다.

5. 요청한 요리가 특정 국가/지역(중국, 나폴리, 한국 등)에서 검증된 방식이 있다면, 반드시 그 방식을 따릅니다.

6. 모든 재료는 한국 가정에서 쉽게 구할 수 있는 재료로 조정 가능하며, 대체 재료 제안도 함께 제공합니다.

7. 모든 과정은 자연스럽고 전문적인 한글로 작성합니다.

8. 출력은 반드시 유효한 JSON 포맷으로만 작성합니다.

9. 모든 JSON 응답은 순수 한글로 작성되어야 하며, 영어, 한자, 일본어, 중국어 등 외국어가 포함되면 안 됩니다.
   - 요리 이름(title), 태그(tags), 설명(content) 등 모든 항목에 외국어가 섞이면 무효입니다.
   - 외국어가 필요한 경우에도 반드시 순수 한글로 자연스럽게 번역하여 표기합니다.
     - 예시: "餅" → "전병" 또는 "부침개"로 번역
   - 한글로 자연스러운 단어가 없는 경우, 한국에서 통용되는 한글 단어로 부드럽게 의역합니다.

10. JSON 키 이름은 영어로 유지하지만, 값은 반드시 100% 한글로 작성합니다.

11. 모든 요리의 조리 시간(cook_time)은 현실적으로 설정합니다.
    - 오향장육: "2시간 이상"
    - 홍소육: "2시간 이상"
    - 나폴리 피자: "2시간 이상"
    - 짜장면: "1시간"
    - 김치찌개: "30분~1시간"
    - 기타 간단한 볶음류: "15분~30분"

---

**[고정 룰] (특정 요리 요청 시만 적용)**

- 오향장육: 돼지고기 오겹살 또는 삼겹살 사용, 팔각, 화자오 필수, 조리 시간 2시간 이상
- 짜장면: 춘장 필수, 양파, 돼지고기 목살 사용, 조리 시간 1시간
- 된장찌개: 된장 필수, 멸치 육수 기본, 조리 시간 30분
- 낙지볶음: 낙지 필수, 고추장, 고춧가루, 설탕 기본, 조리 시간 30분
- 김치찌개: 김치(익은 김치), 돼지고기 목살 또는 삼겹살 사용, 조리 시간 30분~1시간
- 나폴리 피자: 00번 밀가루(이탈리아산) 추천, 모짜렐라 부팔라 사용, 조리 시간 2시간 이상

---

요청 사항:

{userPrompt}

응답은 반드시 다음 JSON 포맷을 정확히 따르세요:

{
  "title": "추천하거나 요청받은 요리 이름",
  "category": "한식, 중식, 양식, 일식, 디저트 중 하나",
  "cook_time": "15분, 30분, 1시간, 2시간, 2시간 이상 중 하나",
  "difficulty": "상, 중, 하 중 하나",
  "material_price": "10,000원, 20,000원, 50,000원, 100,000원, 기타 중 하나",
  "ingredients": [
    "정확한 양과 함께 재료1",
    "정확한 양과 함께 재료2",
    ...
  ],
  "steps": [
    {
      "description": "1단계 상세 조리법"
    },
    {
      "description": "2단계 상세 조리법"
    },
    ...
  ],
  "tags": [
    "요리 관련 태그1",
    "요리 관련 태그2",
    ...
  ],
  "content": "전문가 조리 팁"
}

**반드시 유효한 JSON만 출력하고, 다른 설명이나 추가 문장은 절대 작성하지 마세요.**
**출력 중 한자, 영어, 일본어, 중국어 등 외국어가 있으면 무효이며, 순수 한글로만 작성하세요.**
**잘못된 재료 사용 시, 정통 레시피에 맞춰 수정하거나 거절하도록 하세요.**
**JSON 키 이름은 영어로 작성하되, 값은 반드시 100% 한글로 작성하세요.**
**모든 요리의 조리 시간은 현실적으로 작성하고, 지나치게 짧게 축소하는 것을 금지합니다.**

`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다." },
        { status: 400 }
      );
    }
    
    const finalPrompt = recipeTemplate.replace('{userPrompt}', prompt);
    
    const completion = await groq.chat.completions.create({
      model: "gemma2-9b-it", 
      messages: [
        { 
          role: "system", 
          content: "당신은 100년 경력의 전문 요리사이며, 세계 최고 수준의 요리 실력을 보유하고 있고 모든 레시피를 섭렵한 전문가입니다 검증되고 인기 있는 요리 레시피만 제공합니다. 한국어로 정확하게 응답하며, 반드시 요청된 JSON 형식을 준수합니다. 유효한 JSON만 출력하고 다른 설명은 절대 포함하지 마세요." 
        },
        { 
          role: "user", 
          content: finalPrompt 
        }
      ],
      temperature: 0.5, 
      max_tokens: 2000, 
    });
    
    const recipeResponse = completion.choices[0]?.message?.content || "레시피를 생성할 수 없습니다.";
    
    let recipe;
    try {
      const jsonMatch = recipeResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipe = jsonMatch[0];
        
        const parsedJson = JSON.parse(recipe);
        
        const requiredFields = ['title', 'ingredients', 'instructions', 'tips'];
        const missingFields = requiredFields.filter(field => !parsedJson[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`누락된 필드: ${missingFields.join(', ')}`);
        }
        
        recipe = JSON.stringify(parsedJson);
      } else {
        throw new Error('JSON 형식을 찾을 수 없습니다');
      }
    } catch (error) {
      console.error('JSON 처리 오류:', error);
      
      try {
        const backupCompletion = await groq.chat.completions.create({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "유효한 JSON 형식으로만 응답하세요. 그 외의 텍스트는 포함하지 마세요."
            },
            {
              role: "user",
              content: `다음 레시피를 유효한 JSON 형식으로 변환해주세요:\n\n${recipeResponse}`
            }
          ],
          temperature: 0.3,
        });
        
        const backupResponse = backupCompletion.choices[0]?.message?.content || "";
        const backupJsonMatch = backupResponse.match(/\{[\s\S]*\}/);
        
        if (backupJsonMatch) {
          recipe = backupJsonMatch[0];
          JSON.parse(recipe);
        } else {
          recipe = '{"error": "유효한 레시피를 생성할 수 없습니다", "originalResponse": ' + JSON.stringify(recipeResponse) + '}';
        }
      } catch (backupError) {
        console.error('백업 시도 실패:', backupError);
        recipe = '{"error": "레시피 형식 변환에 실패했습니다"}';
      }
    }
    
    return NextResponse.json({ result: recipe });
    
  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}