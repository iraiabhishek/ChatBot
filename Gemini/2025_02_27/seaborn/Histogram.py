import seaborn as sns
import matplotlib.pyplot as plt

# Sample data
data = sns.load_dataset("titanic")

# Histogram
sns.histplot(data["age"], bins=20, kde=True)

# Show plot
plt.show()
