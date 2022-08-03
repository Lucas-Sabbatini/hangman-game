import joblib
import json
from nltk import word_tokenize

def issame(s):
    a = 0
    pont = 0
    for i in s:
        if i == a :
            pont += 1
        a = i
    if pont >= 3: return False
    else: return True
 
finalWord = ""    
p = 0
palavras = False
input = input()

tweets = json.loads(input)
word = tweets[len(tweets) - 1]
folder = 'POS-tagger-portuguese-nltk/trained_POS_taggers/'
teste_tagger = joblib.load('../twitter-bot/'+folder+'POS_tagger_brill.pkl')
   
while palavras is False:
    classify = teste_tagger.tag(word_tokenize(tweets[p]))
    p+=1

    for i in classify :
        if i[1] == 'N' :
            if issame(i[0]) and i[0].isalpha() and i[0] != word and len(i[0]) > 4 and len(i[0]) < 9:
                palavras = True
                if len(finalWord) < len(i[0]):
                    finalWord = i[0]

print(finalWord + '|' + str(p - 1))
