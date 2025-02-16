export interface Test {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    question: string;
    options: {
      id: number;
      text: string;
      value: number;
    }[];
  }[];
  createdBy: string;
  createdAt: string;
}

export const tests: Test[] = [
  {
    id: 1,
    title: 'Beck Depresyon Testi',
    description: 'Bu test, depresyon belirtilerinizi ve şiddetini değerlendirmenize yardımcı olacaktır. Lütfen son iki hafta içindeki durumunuzu düşünerek yanıtlayın.',
    questions: [
      {
        id: 1,
        question: 'Kendinizi nasıl hissediyorsunuz?',
        options: [
          { id: 1, text: 'Kendimi üzgün hissetmiyorum', value: 0 },
          { id: 2, text: 'Kendimi üzgün hissediyorum', value: 1 },
          { id: 3, text: 'Her zaman üzgünüm ve bundan kurtulamıyorum', value: 2 },
          { id: 4, text: 'O kadar üzgün ve mutsuzum ki dayanamıyorum', value: 3 }
        ]
      },
      {
        id: 2,
        question: 'Gelecek hakkında ne düşünüyorsunuz?',
        options: [
          { id: 1, text: 'Gelecek hakkında umutsuz değilim', value: 0 },
          { id: 2, text: 'Gelecek hakkında umutsuzum', value: 1 },
          { id: 3, text: 'Gelecekten beklediğim hiçbir şey yok', value: 2 },
          { id: 4, text: 'Geleceğim hakkında umutsuzum ve sanki hiçbir şey düzelmeyecekmiş gibi geliyor', value: 3 }
        ]
      },
      {
        id: 3,
        question: 'Geçmiş başarılarınızı nasıl değerlendiriyorsunuz?',
        options: [
          { id: 1, text: 'Kendimi başarısız görmüyorum', value: 0 },
          { id: 2, text: 'Çevremdeki birçok kişiden daha fazla başarısızlıklarım oldu', value: 1 },
          { id: 3, text: 'Geriye dönüp baktığımda birçok başarısızlık görüyorum', value: 2 },
          { id: 4, text: 'Kendimi tümüyle başarısız bir insan olarak görüyorum', value: 3 }
        ]
      },
      {
        id: 4,
        question: 'Hayattan ne kadar zevk alıyorsunuz?',
        options: [
          { id: 1, text: 'Her şeyden eskisi kadar zevk alıyorum', value: 0 },
          { id: 2, text: 'Her şeyden eskisi kadar zevk alamıyorum', value: 1 },
          { id: 3, text: 'Artık hiçbir şeyden gerçek bir zevk alamıyorum', value: 2 },
          { id: 4, text: 'Bana zevk veren hiçbir şey yok. Her şey çok sıkıcı', value: 3 }
        ]
      },
      {
        id: 5,
        question: 'Kendinizi ne kadar suçlu hissediyorsunuz?',
        options: [
          { id: 1, text: 'Kendimi suçlu hissetmiyorum', value: 0 },
          { id: 2, text: 'Kendimi birçok konuda suçlu hissediyorum', value: 1 },
          { id: 3, text: 'Kendimi çoğu zaman suçlu hissediyorum', value: 2 },
          { id: 4, text: 'Kendimi her zaman suçlu hissediyorum', value: 3 }
        ]
      },
      {
        id: 6,
        question: 'Uyku düzeniniz nasıl?',
        options: [
          { id: 1, text: 'Her zamanki gibi uyuyabiliyorum', value: 0 },
          { id: 2, text: 'Eskisi kadar iyi uyuyamıyorum', value: 1 },
          { id: 3, text: 'Her zamankinden 1-2 saat erken uyanıyorum ve tekrar uyumakta zorlanıyorum', value: 2 },
          { id: 4, text: 'Her zamankinden çok erken uyanıyorum ve tekrar uyuyamıyorum', value: 3 }
        ]
      },
      {
        id: 7,
        question: 'Yorgunluk düzeyiniz nasıl?',
        options: [
          { id: 1, text: 'Her zamankinden daha çok yorgun değilim', value: 0 },
          { id: 2, text: 'Her zamankinden daha çabuk yoruluyorum', value: 1 },
          { id: 3, text: 'Yaptığım her şey beni yoruyor', value: 2 },
          { id: 4, text: 'Kendimi hiçbir şey yapamayacak kadar yorgun hissediyorum', value: 3 }
        ]
      }
    ],
    createdBy: 'psikojuvs',
    createdAt: '2024-03-15'
  }
]; 