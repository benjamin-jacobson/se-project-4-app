from openai import OpenAI
import os
from dotenv import load_dotenv



def get_openai_response(prompt,):
    max_retries = 5
    backoff_time = 1  # initial backoff time in seconds

    load_dotenv('secrets.env')
    api_key = os.getenv('CHATGPT_SECRET_KEY')


    client = OpenAI(api_key=api_key)

    for i in range(max_retries):
        try:
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,  # Adjust the token limit as needed
                temperature=0.7  # Adjust the temperature for randomness; 0.7 is a good default
            )
            return completion.choices[0].message.content #['content'].strip()
        except Exception as e:
            print(f"An error occurred: {e}")
            break

    return "Error: Unable to get response from OpenAI."

def main():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("Exiting the chat. Goodbye!")
            break

        response = get_openai_response(user_input)
        print(f"AI: {response}")

if __name__ == "__main__":
    main()
